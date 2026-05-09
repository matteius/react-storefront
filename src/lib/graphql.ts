import { cookies } from "next/headers";
import { invariant } from "ts-invariant";
import { type TypedDocumentString } from "../gql/graphql";
import { ACCESS_TOKEN_COOKIE } from "@/lib/fief";

type GraphQLErrorResponse = {
	errors: readonly {
		message: string;
	}[];
};

type GraphQLRespone<T> = { data: T } | GraphQLErrorResponse;

export async function executeGraphQL<Result, Variables>(
	operation: TypedDocumentString<Result, Variables>,
	options: {
		headers?: HeadersInit;
		cache?: RequestCache;
		revalidate?: number;
		withAuth?: boolean;
	} & (Variables extends Record<string, never> ? { variables?: never } : { variables: Variables }),
): Promise<Result> {
	invariant(process.env.NEXT_PUBLIC_SALEOR_API_URL, "Missing NEXT_PUBLIC_SALEOR_API_URL env variable");
	const { variables, headers, cache, revalidate, withAuth = false } = options;

	/*
	 * When `withAuth` is requested, read the Fief-flow access token cookie
	 * directly and attach it as a Bearer header. The saleor-auth-sdk
	 * (`getServerAuthClient().fetchWithAuth(...)`) prefixes its storage keys
	 * with the saleorApiUrl (`<url>+saleor_auth_access_token`); cookie names
	 * with `:` and `/` aren't reliably stored by browsers, so the SDK never
	 * sees the token and silently sends an unauthenticated request. Reading
	 * the bare cookie ourselves sidesteps that.
	 */
	const authHeaders: Record<string, string> = {};
	if (withAuth) {
		const accessToken = (await cookies()).get(ACCESS_TOKEN_COOKIE)?.value;
		if (accessToken) {
			authHeaders.Authorization = `Bearer ${accessToken}`;
		}
	}

	const input = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			...authHeaders,
			...headers,
		},
		body: JSON.stringify({
			query: String(operation),
			...(variables && { variables }),
		}),
		cache: cache,
		next: { revalidate },
	};

	const response = await fetch(process.env.NEXT_PUBLIC_SALEOR_API_URL, input);

	if (!response.ok) {
		const body = await (async () => {
			try {
				return await response.text();
			} catch {
				return "";
			}
		})();
		console.error(input.body);
		throw new HTTPError(response, body);
	}

	const body = (await response.json()) as GraphQLRespone<Result>;

	if ("errors" in body) {
		throw new GraphQLError(body);
	}

	return body.data;
}

class GraphQLError extends Error {
	constructor(public errorResponse: GraphQLErrorResponse) {
		const message = errorResponse.errors.map((error) => error.message).join("\n");
		super(message);
		this.name = this.constructor.name;
		Object.setPrototypeOf(this, new.target.prototype);
	}
}
class HTTPError extends Error {
	constructor(response: Response, body: string) {
		const message = `HTTP error ${response.status}: ${response.statusText}\n${body}`;
		super(message);
		this.name = this.constructor.name;
		Object.setPrototypeOf(this, new.target.prototype);
	}
}
