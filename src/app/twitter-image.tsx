import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Matt's Coinage - Premium Collectible Coins & Bullion";
export const size = {
	width: 1200,
	height: 630,
};
export const contentType = "image/png";

export default async function Image() {
	return new ImageResponse(
		(
			<div
				style={{
					background: "linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #b45309 100%)",
					width: "100%",
					height: "100%",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					padding: "40px",
				}}
			>
				{/* Decorative circles */}
				<div
					style={{
						position: "absolute",
						top: "40px",
						left: "40px",
						width: "120px",
						height: "120px",
						borderRadius: "50%",
						background: "rgba(255, 255, 255, 0.15)",
						display: "flex",
					}}
				/>
				<div
					style={{
						position: "absolute",
						bottom: "60px",
						right: "60px",
						width: "180px",
						height: "180px",
						borderRadius: "50%",
						background: "rgba(255, 255, 255, 0.1)",
						display: "flex",
					}}
				/>

				{/* Main content */}
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						textAlign: "center",
					}}
				>
					{/* Coin emoji as logo placeholder */}
					<div
						style={{
							fontSize: "100px",
							marginBottom: "20px",
							display: "flex",
						}}
					>
						🪙
					</div>

					{/* Site name */}
					<div
						style={{
							fontSize: "72px",
							fontWeight: "bold",
							color: "white",
							marginBottom: "16px",
							textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
							display: "flex",
						}}
					>
						Matt&apos;s Coinage
					</div>

					{/* Tagline */}
					<div
						style={{
							fontSize: "32px",
							color: "rgba(255, 255, 255, 0.95)",
							marginBottom: "24px",
							display: "flex",
						}}
					>
						Premium Collectible Coins & Bullion
					</div>

					{/* URL */}
					<div
						style={{
							fontSize: "24px",
							color: "rgba(255, 255, 255, 0.8)",
							padding: "12px 32px",
							background: "rgba(0, 0, 0, 0.2)",
							borderRadius: "50px",
							display: "flex",
						}}
					>
						www.MattsCoinage.com
					</div>
				</div>
			</div>
		),
		{
			...size,
		},
	);
}

