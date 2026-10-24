/**
 * Shared Logo Component
 *
 * Mattscoinage logo used on light and dark surfaces.
 *
 * @example
 * <Logo className="h-7 w-auto" />
 * <Logo className="h-7 w-auto" inverted />
 */

interface LogoProps {
	className?: string;
	/** Accessible label for the logo */
	ariaLabel?: string;
	/** Light logo for dark/inverted backgrounds (footer) */
	inverted?: boolean;
}

export const Logo = ({ className, ariaLabel = "Mattscoinage" }: LogoProps) => {
	const src = "/logo.png";

	return (
		// eslint-disable-next-line @next/next/no-img-element
		<img src={src} alt={ariaLabel} width={80} height={80} className={`aspect-square ${className ?? ""}`} />
	);
};
