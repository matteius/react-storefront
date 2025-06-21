import { Logo } from "./Logo";
import { Nav } from "./nav/Nav";

export function Header({ channel }: { channel: string }) {
	return (
		<header className="glass-effect sticky top-0 z-50 border-b border-gold-200/30 shadow-lg">
			<div className="absolute inset-0 bg-gradient-to-r from-gold-400/90 via-yellow-400/90 to-gold-500/90"></div>
			<div className="container relative flex h-20 flex-nowrap items-center lg:h-24">
				<div className="xs:justify-left flex flex-1">
					<div className="floating-animation">
						<Logo />
					</div>
				</div>
				<div className="hidden h-full flex-1 xs:flex">
					<Nav channel={channel} />
				</div>
			</div>
		</header>
	);
}
