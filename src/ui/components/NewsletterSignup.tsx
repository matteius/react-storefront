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
				<div className="flex flex-col gap-4 sm:flex-row">
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Enter your email address"
						disabled={status === "loading"}
						className="flex-1 rounded-xl border-0 bg-white/95 px-6 py-4 text-lg text-gray-800 placeholder-gray-500 shadow-lg backdrop-blur-sm transition-all duration-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-white/40 disabled:opacity-50"
					/>
					<button
						type="submit"
						disabled={status === "loading"}
						className="group relative overflow-hidden rounded-xl bg-white px-8 py-4 font-bold text-amber-600 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:hover:scale-100"
					>
						<span className="relative z-10 flex items-center justify-center gap-2">
							{status === "loading" ? (
								<>
									<svg className="h-4 w-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
										/>
									</svg>
									Subscribing...
								</>
							) : (
								<>
									Subscribe Now
									<svg
										className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
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
						<div className="absolute inset-0 bg-gradient-to-r from-amber-50 to-gold-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
					</button>
				</div>
			</form>

			{/* Status Messages */}
			{message && (
				<div
					className={`mt-4 rounded-lg p-4 text-center ${
						status === "success"
							? "border border-green-400/30 bg-green-100/20 text-green-100"
							: status === "error"
								? "border border-red-400/30 bg-red-100/20 text-red-100"
								: ""
					}`}
				>
					{status === "success" && (
						<div className="flex items-center justify-center gap-2">
							<svg className="h-5 w-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
							</svg>
							{message}
						</div>
					)}
					{status === "error" && (
						<div className="flex items-center justify-center gap-2">
							<svg className="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
							{message}
						</div>
					)}
				</div>
			)}
		</div>
	);
}
