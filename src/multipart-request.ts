// Match Next.js's default Server Action body limit. Keep this aligned if the
// application introduces experimental.serverActions.bodySizeLimit.
const MAX_ACTION_BODY_BYTES = 1024 * 1024;

/** Validate a clone so native form actions still receive their original body. */
export async function validateMultipartRequest(request: Request): Promise<Response | undefined> {
	if (request.method !== "POST") return;
	const contentType = request.headers.get("content-type") ?? "";
	if (contentType.split(";", 1)[0].trim().toLowerCase() !== "multipart/form-data") return;

	const reject = (status: number) =>
		new Response(status === 413 ? "Request body too large" : "Malformed multipart body", {
			status,
			headers: { "Cache-Control": "no-store" },
		});
	const declaredSize = Number(request.headers.get("content-length"));
	if (declaredSize > MAX_ACTION_BODY_BYTES) return reject(413);

	const reader = request.clone().body?.getReader();
	if (!reader) return reject(400);
	const chunks: Uint8Array[] = [];
	let size = 0;
	try {
		for (;;) {
			const { done, value } = await reader.read();
			if (done) break;
			size += value.byteLength;
			if (size > MAX_ACTION_BODY_BYTES) {
				// A tee's cancellation waits for its other branch. Do not await it:
				// the untouched original belongs to Next.js and is discarded on 413.
				void reader.cancel().catch(() => undefined);
				return reject(413);
			}
			chunks.push(value);
		}
		const body = new Uint8Array(size);
		let offset = 0;
		for (const chunk of chunks) {
			body.set(chunk, offset);
			offset += chunk.byteLength;
		}
		await new Response(body, { headers: { "Content-Type": contentType } }).formData();
	} catch (error) {
		if (error instanceof TypeError || (error instanceof DOMException && error.name === "AbortError")) {
			return reject(400);
		}
		throw error;
	} finally {
		reader.releaseLock();
	}
}
