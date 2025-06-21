import { Logo } from "./Logo";
import { Nav } from "./nav/Nav";

export function Header({ channel }: { channel: string }) {
	return (
		<header className="sticky top-0 z-50 bg-yellow-400 text-main">
			<div className="container flex h-18 flex-nowrap items-center">
				<div className="xs:justify-left flex flex-1">
					<Logo />
				</div>
				<div className="hidden h-full flex-1 xs:flex">
					<Nav channel={channel} />
				</div>
			</div>
		</header>
	);
}
