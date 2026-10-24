/** @type {import('next').NextConfig} */
const config = {
	images: {
		remotePatterns: [
			{
				hostname: "*",
			},
		],
		// Disable image optimization to prevent IPv6 localhost resolution issues in Docker
		unoptimized: true,
	},
	typedRoutes: false,
	// Empty turbopack config to silence Next.js 16 warning
	turbopack: {},
	// used in the Dockerfile
	output:
		process.env.NEXT_OUTPUT === "standalone"
			? "standalone"
			: process.env.NEXT_OUTPUT === "export"
				? "export"
				: undefined,
	// Add redirects for old URLs
	async redirects() {
		return [
			{
				source: "/default-channel/en-US",
				destination: "/default-channel",
				permanent: true,
			},
			{
				source: "/default-channel/en-US/:path*",
				destination: "/default-channel/:path*",
				permanent: true,
			},
		];
	},
	productionBrowserSourceMaps: true,
	compiler: {
		removeConsole: false,
	},
	// Mark elastic-apm-node as external so it's not bundled (it's Node.js only)
	serverExternalPackages: ["elastic-apm-node", "pino", "@elastic/ecs-pino-format"],
	// Override webpack config to disable minification and show detailed errors
	webpack: (config, { dev, isServer }) => {
		if (!dev) {
			// Disable minification in production
			config.optimization.minimize = false;
			// Disable mangling to keep function names readable
			if (config.optimization.minimizer) {
				config.optimization.minimizer = [];
			}
		}
		return config;
	},
};

export default config;
