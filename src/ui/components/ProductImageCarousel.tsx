"use client";

import { useState } from "react";
import { ImageModal } from "./ImageModal";
import { ProductImageWrapper } from "@/ui/atoms/ProductImageWrapper";

interface ProductImage {
	id: string;
	url: string;
	alt?: string | null;
	type: string;
}

interface ProductImageCarouselProps {
	images: ProductImage[];
	productName: string;
	loading?: "eager" | "lazy";
	priority?: boolean;
}

export const ProductImageCarousel = ({
	images,
	productName,
	loading = "lazy",
	priority = false,
}: ProductImageCarouselProps) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isModalOpen, setIsModalOpen] = useState(false);

	// Filter only image types and ensure we have at least one image
	const imageMedia = images.filter((media) => media.type === "IMAGE");

	if (imageMedia.length === 0) {
		return (
			<div className="flex aspect-square w-full flex-col overflow-hidden rounded bg-gray-200">
				<div className="flex h-full items-center justify-center text-gray-400">
					<svg className="h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={1}
							d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2z"
						/>
					</svg>
				</div>
			</div>
		);
	}

	const currentImage = imageMedia[currentIndex];

	const goToPrevious = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setCurrentIndex((prev) => (prev - 1 + imageMedia.length) % imageMedia.length);
	};

	const goToNext = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setCurrentIndex((prev) => (prev + 1) % imageMedia.length);
	};

	const openModal = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setIsModalOpen(true);
	};

	return (
		<>
			<div className="group relative flex aspect-square w-full flex-col overflow-hidden rounded bg-gray-200">
				{/* Main Image */}
				<div className="relative h-full w-full cursor-pointer" onClick={openModal}>
					<ProductImageWrapper
						loading={loading}
						src={currentImage.url}
						alt={currentImage.alt || `${productName} image`}
						width={512}
						height={512}
						sizes="512px"
						priority={priority}
						className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
					/>

					{/* Zoom indicator */}
					<div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-200 group-hover:bg-black/20">
						<div className="rounded-full bg-white/0 p-2 transition-all duration-200 group-hover:bg-white/90">
							<svg
								className="h-6 w-6 text-transparent transition-all duration-200 group-hover:text-gray-800"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
								/>
							</svg>
						</div>
					</div>
				</div>

				{/* Navigation arrows - only show if multiple images */}
				{imageMedia.length > 1 && (
					<>
						<button
							onClick={goToPrevious}
							className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 opacity-0 shadow-md transition-all duration-200 hover:bg-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 group-hover:opacity-100"
							aria-label="Previous image"
						>
							<svg className="h-4 w-4 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
							</svg>
						</button>
						<button
							onClick={goToNext}
							className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 opacity-0 shadow-md transition-all duration-200 hover:bg-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 group-hover:opacity-100"
							aria-label="Next image"
						>
							<svg className="h-4 w-4 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
							</svg>
						</button>
					</>
				)}

				{/* Image counter - only show if multiple images */}
				{imageMedia.length > 1 && (
					<div className="absolute bottom-2 right-2 rounded-full bg-black/60 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
						{currentIndex + 1}/{imageMedia.length}
					</div>
				)}

				{/* Dot indicators - only show if multiple images */}
				{imageMedia.length > 1 && (
					<div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 space-x-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
						{imageMedia.map((_, index) => (
							<button
								key={index}
								onClick={(e) => {
									e.preventDefault();
									e.stopPropagation();
									setCurrentIndex(index);
								}}
								className={`h-2 w-2 rounded-full transition-all duration-200 ${
									index === currentIndex ? "bg-white" : "bg-white/50 hover:bg-white/75"
								}`}
								aria-label={`Go to image ${index + 1}`}
							/>
						))}
					</div>
				)}
			</div>

			{/* Image Modal */}
			<ImageModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				images={imageMedia}
				initialIndex={currentIndex}
			/>
		</>
	);
};
