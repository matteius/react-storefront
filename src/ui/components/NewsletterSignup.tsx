"use client";

import { useState } from "react";

interface NewsletterSignupProps {
	className?: string;
}

export function NewsletterSignup({ className = "" }: NewsletterSignupProps) {
	const [email, setEmail] = useState("");
	const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
	const [message, setMessage] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!email) {
			setStatus("error");
			setMessage("Please enter your email address");
			return;
		}

		setStatus("loading");
		setMessage("");

		try {
			const response = await fetch("/api/newsletter", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email }),
			});

			const data = (await response.json()) as { message?: string; error?: string };

			if (response.ok) {
				setStatus("success");
				setMessage(data.message || "Successfully subscribed!");
				setEmail(""); // Clear the form
			} else {
				setStatus("error");
				setMessage(data.error || "Something went wrong. Please try again.");
			}
		} catch (error) {
			setStatus("error");
			setMessage("Network error. Please check your connection and try again.");
		}
	};

	return (
		<div className={className}>
			<form onSubmit={handleSubmit} className="mx-auto max-w-lg">
				<div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
					<div className="group relative flex-1">
						{/* Input field with enhanced styling */}
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="Enter your email address"
							disabled={status === "loading"}
							className="w-full rounded-xl border-2 border-white/20 bg-white/95 px-6 py-4 text-base text-gray-800 placeholder-gray-500 shadow-xl backdrop-blur-sm transition-all duration-300 focus:border-white focus:bg-white focus:shadow-2xl focus:outline-none focus:ring-4 focus:ring-white/50 disabled:cursor-not-allowed disabled:opacity-50 sm:text-lg"
						/>
						{/* Subtle glow effect on focus */}
						<div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 shadow-[0_0_20px_rgba(255,255,255,0.5)] transition-opacity duration-300 group-focus-within:opacity-100"></div>
					</div>
					<button
						type="submit"
						disabled={status === "loading"}
						className="group relative overflow-hidden rounded-xl bg-white px-8 py-4 font-bold text-amber-600 shadow-xl transition-all duration-300 hover:scale-105 hover:bg-gradient-to-r hover:from-white hover:to-amber-50 hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
					>
						{/* Animated gradient background on hover */}
						<div className="absolute inset-0 bg-gradient-to-r from-amber-100 via-gold-100 to-yellow-100 opacity-0 transition-opacity duration-300 group-hover:opacity-30"></div>

						{/* Button content */}
						<span className="relative z-10 flex items-center justify-center gap-2 whitespace-nowrap text-sm sm:text-base">
							{status === "loading" ? (
								<>
									<svg className="h-5 w-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
										/>
									</svg>
									<span className="hidden sm:inline">Subscribing...</span>
									<span className="sm:hidden">Wait...</span>
								</>
							) : (
								<>
									<span>Subscribe Now</span>
									<svg
										className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M13 7l5 5m0 0l-5 5m5-5H6"
										/>
									</svg>
								</>
							)}
						</span>

						{/* Shine effect on hover */}
						<div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full"></div>
					</button>
				</div>
			</form>

			{/* Status Messages with enhanced animations */}
			{message && (
				<div
					className={`animate-in fade-in slide-in-from-top-2 mt-4 rounded-xl p-4 text-center shadow-lg backdrop-blur-sm duration-300 ${
						status === "success"
							? "border-2 border-green-400/40 bg-green-100/30 text-white shadow-green-500/20"
							: status === "error"
								? "border-2 border-red-400/40 bg-red-100/30 text-white shadow-red-500/20"
								: ""
					}`}
				>
					{status === "success" && (
						<div className="flex items-center justify-center gap-2 font-medium">
							<svg
								className="animate-in zoom-in h-6 w-6 text-green-300 duration-500"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
							</svg>
							<span className="text-sm sm:text-base">{message}</span>
						</div>
					)}
					{status === "error" && (
						<div className="flex items-center justify-center gap-2 font-medium">
							<svg
								className="animate-in zoom-in h-6 w-6 text-red-300 duration-500"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2.5}
									d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
							<span className="text-sm sm:text-base">{message}</span>
						</div>
					)}
				</div>
			)}
		</div>
	);
}
