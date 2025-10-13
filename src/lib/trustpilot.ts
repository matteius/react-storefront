// TrustPilot script loader utility

declare global {
	interface Window {
		Trustpilot: {
			loadFromElement: (element: Element | null) => void;
		};
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

	await loadTrustPilotScript();

	// Wait for TrustPilot to be available
	const waitForTrustPilot = (): Promise<void> => {
		return new Promise((resolve) => {
			const checkTrustPilot = () => {
				if (window.Trustpilot && typeof window.Trustpilot.loadFromElement === "function") {
					resolve();
				} else {
					setTimeout(checkTrustPilot, 100);
				}
			};
			checkTrustPilot();
		});
	};

	await waitForTrustPilot();

	// Initialize all widgets
	const widgets = document.querySelectorAll(".trustpilot-widget");
	widgets.forEach((widget) => {
		try {
			if (window.Trustpilot && typeof window.Trustpilot.loadFromElement === "function") {
				window.Trustpilot.loadFromElement(widget);
			}
		} catch (error) {
			console.error("Error loading TrustPilot widget:", error);
		}
	});
};
