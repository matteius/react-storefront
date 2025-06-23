import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;
	
	// Check if the request is for a channel route
	const channelMatch = pathname.match(/^\/([^\/]+)/);
	
	if (channelMatch) {
		const channel = channelMatch[1];
		
		// Allow default-channel and other non-channel routes (like checkout, api, etc.)
		if (channel === 'default-channel' || 
			channel === 'checkout' || 
			channel === 'api' || 
			channel === '_next' ||
			!pathname.startsWith('/')) {
			return NextResponse.next();
		}
		
		// Check if this looks like a channel route (not a static file)
		// Channel routes typically don't have file extensions
		if (!channel.includes('.')) {
			// Redirect any other channel to default-channel
			const url = request.nextUrl.clone();
			url.pathname = pathname.replace(`/${channel}`, '/default-channel');
			return NextResponse.redirect(url);
		}
	}
	
	return NextResponse.next();
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 * - public files (public folder)
		 */
		'/((?!_next/static|_next/image|favicon.ico|.*\\..*|public).*)',
	],
};
