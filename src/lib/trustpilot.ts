// TrustPilot script loader utility

interface TrustPilotAPI {
	loadFromElement: (element: Element | null) => void;
}

declare global {
	interface Window {
		Trustpilot?: TrustPilotAPI;
	}
}

let scriptLoaded = false;
let scriptLoading = false;
const loadPromises: Array<() => void> = [];

export const loadTrustPilotScript = (): Promise<void> => {
	return new Promise((resolve) => {
		// If already loaded, resolve immediately
		if (scriptLoaded && window.Trustpilot) {
			resolve();
			return;
		}

		// Add to queue if currently loading
		if (scriptLoading) {
			loadPromises.push(resolve);
			return;
		}

		// Check if script already exists
		const existingScript = document.querySelector('script[src*="trustpilot"]');
		if (existingScript) {
			scriptLoading = true;
			existingScript.addEventListener("load", () => {
				scriptLoaded = true;
				scriptLoading = false;
				resolve();
				loadPromises.forEach((callback) => callback());
				loadPromises.length = 0;
			});
			return;
		}

		// Load the script
		scriptLoading = true;
		const script = document.createElement("script");
		script.src = "https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js";
		script.async = true;

		script.onload = () => {
			scriptLoaded = true;
			scriptLoading = false;
			resolve();
			loadPromises.forEach((callback) => callback());
			loadPromises.length = 0;
		};

		script.onerror = () => {
			console.error("Failed to load TrustPilot script");
			scriptLoading = false;
			resolve();
			loadPromises.forEach((callback) => callback());
			loadPromises.length = 0;
		};

		document.head.appendChild(script);
	});
};

export const initializeTrustPilotWidgets = async (): Promise<void> => {
	if (typeof window === "undefined") return;

	console.log("[TrustPilot] Initializing widgets...");

	await loadTrustPilotScript();

	// Wait for TrustPilot to be available with timeout
	const waitForTrustPilot = (): Promise<boolean> => {
		return new Promise((resolve) => {
			let attempts = 0;
			const maxAttempts = 50; // 5 seconds max wait

			const checkTrustPilot = () => {
				if (window.Trustpilot?.loadFromElement) {
					console.log("[TrustPilot] API available");
					resolve(true);
				} else if (attempts >= maxAttempts) {
					console.warn("[TrustPilot] Script failed to load after 5 seconds");
					resolve(false);
				} else {
					attempts++;
					setTimeout(checkTrustPilot, 100);
				}
			};
			checkTrustPilot();
		});
	};

	const isAvailable = await waitForTrustPilot();
	if (!isAvailable) {
		console.error("[TrustPilot] API not available");
		return;
	}

	// Initialize all widgets
	const widgets = document.querySelectorAll(".trustpilot-widget");

	console.log(`[TrustPilot] Found ${widgets.length} widgets`);

	if (widgets.length === 0) {
		console.warn("[TrustPilot] No widgets found on page");
		return;
	}

	widgets.forEach((widget, index) => {
		try {
			if (window.Trustpilot?.loadFromElement) {
				// Check if widget has required attributes
				const businessunitId = widget.getAttribute("data-businessunit-id");
				const templateId = widget.getAttribute("data-template-id");

				console.log(`[TrustPilot] Widget ${index}:`, {
					businessunitId,
					templateId,
					element: widget,
				});

				if (!businessunitId || !templateId) {
					console.error("[TrustPilot] Widget missing required attributes:", {
						businessunitId,
						templateId,
						widget,
					});
					return;
				}

				console.log(`[TrustPilot] Loading widget ${index}...`);
				window.Trustpilot.loadFromElement(widget);
				console.log(`[TrustPilot] Widget ${index} loaded successfully`);
			}
		} catch (error) {
			console.error(`[TrustPilot] Error loading widget ${index}:`, error);
		}
	});
};
