import { Logo } from "./Logo";
import { Nav } from "./nav/Nav";

export function Header({ channel }: { channel: string }) {
	return (
		<header className="glass-effect sticky top-0 z-50 border-b border-gold-200/30 shadow-xl">
			<div className="absolute inset-0 bg-gradient-to-r from-gold-400/95 via-yellow-400/95 to-gold-500/95"></div>
			<div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/5"></div>
			<div className="container relative flex h-14 flex-nowrap items-center lg:h-16">
				<div className="flex flex-1">
					<div className="floating-animation pulse-glow rounded-lg">
						<Logo />
					</div>
				</div>
				<div className="h-full flex-1">
					<Nav channel={channel} />
				</div>
			</div>
		</header>
	);
}
