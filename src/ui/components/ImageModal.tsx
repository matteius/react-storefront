"use client";

import { useState, useEffect } from "react";
import NextImage from "next/image";

interface ImageModalProps {
	isOpen: boolean;
	onClose: () => void;
	images: Array<{
		id: string;
		url: string;
		alt?: string | null;
	}>;
	initialIndex?: number;
}

export const ImageModal = ({ isOpen, onClose, images, initialIndex = 0 }: ImageModalProps) => {
	const [currentIndex, setCurrentIndex] = useState(initialIndex);

	useEffect(() => {
		setCurrentIndex(initialIndex);
	}, [initialIndex]);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (!isOpen) return;

			switch (event.key) {
				case "Escape":
					onClose();
					break;
				case "ArrowLeft":
					setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
					break;
				case "ArrowRight":
					setCurrentIndex((prev) => (prev + 1) % images.length);
					break;
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [isOpen, onClose, images.length]);

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}

		return () => {
			document.body.style.overflow = "unset";
		};
	}, [isOpen]);

	if (!isOpen || images.length === 0) return null;

	const currentImage = images[currentIndex];

	const goToPrevious = () => {
		setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
	};

	const goToNext = () => {
		setCurrentIndex((prev) => (prev + 1) % images.length);
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
			{/* Close button */}
			<button
				onClick={onClose}
				className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
				aria-label="Close modal"
			>
				<svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
				</svg>
			</button>

			{/* Navigation arrows */}
			{images.length > 1 && (
				<>
					<button
						onClick={goToPrevious}
						className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
						aria-label="Previous image"
					>
						<svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
						</svg>
					</button>
					<button
						onClick={goToNext}
						className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
						aria-label="Next image"
					>
						<svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
						</svg>
					</button>
				</>
			)}

			{/* Main image */}
			<div className="relative max-h-[90vh] max-w-[90vw]">
				<NextImage
					src={currentImage.url}
					alt={currentImage.alt || "Product image"}
					width={2048}
					height={2048}
					className="max-h-[90vh] max-w-[90vw] object-contain"
					priority
				/>
			</div>

			{/* Image counter */}
			{images.length > 1 && (
				<div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-4 py-2 text-sm text-white">
					{currentIndex + 1} / {images.length}
				</div>
			)}

			{/* Thumbnail navigation */}
			{images.length > 1 && (
				<div className="absolute bottom-16 left-1/2 flex -translate-x-1/2 space-x-2 overflow-x-auto rounded-lg bg-black/50 p-2">
					{images.map((image, index) => (
						<button
							key={image.id}
							onClick={() => setCurrentIndex(index)}
							className={`relative h-16 w-16 flex-shrink-0 overflow-hidden rounded border-2 transition-all ${
								index === currentIndex ? "border-white" : "border-transparent opacity-60 hover:opacity-80"
							}`}
						>
							<NextImage
								src={image.url}
								alt={image.alt || "Product thumbnail"}
								width={64}
								height={64}
								className="h-full w-full object-cover"
							/>
						</button>
					))}
				</div>
			)}

			{/* Click outside to close */}
			<div className="absolute inset-0 -z-10" onClick={onClose} aria-label="Close modal" />
		</div>
	);
};
