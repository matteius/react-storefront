import type * as Sentry from "@sentry/nextjs";
import project from "./sentry.project.json";

export const sentryOptions: Parameters<typeof Sentry.init>[0] = {
	dsn: process.env.NEXT_PUBLIC_SENTRY_DSN || project.dsn,
	environment: process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT || process.env.NODE_ENV,
	enabled:
		process.env.NEXT_PUBLIC_SENTRY_ENABLED !== "false" &&
		(process.env.NODE_ENV === "production" || process.env.NEXT_PUBLIC_SENTRY_ENABLED === "true"),
	dataCollection: {
		userInfo: false,
		cookies: false,
		httpHeaders: { request: false, response: false },
		httpBodies: [],
		urlQueryParams: false,
		genAI: { inputs: false, outputs: false },
		databaseQueryData: false,
		graphQL: { document: false, variables: false },
		stackFrameVariables: false,
	},
	tracesSampleRate: process.env.NODE_ENV === "development" ? 1.0 : 0.1,
	// Keep request payloads and credentials out of error reports.
	beforeSend(event) {
		if (event.request) {
			delete event.request.data;
			delete event.request.cookies;
			delete event.request.headers;
			delete event.request.query_string;
			if (event.request.url) event.request.url = event.request.url.split(/[?#]/)[0];
		}
		delete event.user;
		return event;
	},
	beforeBreadcrumb(breadcrumb) {
		// Console logs can contain document, billing, or authentication data.
		if (breadcrumb.category === "console") return null;
		if (typeof breadcrumb.data?.url === "string") {
			breadcrumb.data.url = breadcrumb.data.url.split(/[?#]/)[0];
		}
		return breadcrumb;
	},
};
