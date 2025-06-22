"use client";

import { useState } from "react";
import NextImage from "next/image";
import { ImageModal } from "./ImageModal";

interface ProductImage {
	id: string;
	url: string;
	alt?: string | null;
	type: string;
}

interface ProductDetailImageGalleryProps {
	images: ProductImage[];
	productName: string;
	thumbnailUrl?: string;
	thumbnailAlt?: string | null;
}

export const ProductDetailImageGallery = ({
	images,
	productName,
	thumbnailUrl,
	thumbnailAlt,
}: ProductDetailImageGalleryProps) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isModalOpen, setIsModalOpen] = useState(false);

	// Filter only image types
	const imageMedia = images.filter((media) => media.type === "IMAGE");

	// If no media images but we have a thumbnail, use that
	const displayImages =
		imageMedia.length > 0
			? imageMedia
			: thumbnailUrl
				? [
						{
							id: "thumbnail",
							url: thumbnailUrl,
							alt: thumbnailAlt,
							type: "IMAGE",
						},
					]
				: [];

	if (displayImages.length === 0) {
		return (
			<div className="flex aspect-square w-full items-center justify-center bg-gray-200">
				<div className="text-gray-400">
					<svg className="h-24 w-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={1}
							d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
						/>
					</svg>
				</div>
			</div>
		);
	}

	const currentImage = displayImages[currentIndex];

	const openModal = () => {
		setIsModalOpen(true);
	};

	return (
		<div className="space-y-4">
			{/* Main Image */}
			<div className="group relative aspect-square w-full cursor-pointer" onClick={openModal}>
				<NextImage
					src={currentImage.url}
					alt={currentImage.alt || `${productName} image`}
					width={1024}
					height={1024}
					className="h-full w-full object-contain transition-transform duration-200 group-hover:scale-105"
					priority
				/>

				{/* Zoom indicator */}
				<div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-200 group-hover:bg-black/20">
					<div className="rounded-full bg-white/0 p-3 transition-all duration-200 group-hover:bg-white/90">
						<svg
							className="h-8 w-8 text-transparent transition-all duration-200 group-hover:text-gray-800"
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

				{/* Image counter */}
				{displayImages.length > 1 && (
					<div className="absolute right-4 top-4 rounded-full bg-black/60 px-3 py-1 text-sm text-white">
						{currentIndex + 1}/{displayImages.length}
					</div>
				)}
			</div>

			{/* Thumbnail Navigation - only show if multiple images */}
			{displayImages.length > 1 && (
				<div className="flex space-x-2 overflow-x-auto pb-2">
					{displayImages.map((image, index) => (
						<button
							key={image.id}
							onClick={() => setCurrentIndex(index)}
							className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded border-2 transition-all ${
								index === currentIndex
									? "border-blue-500 ring-2 ring-blue-200"
									: "border-gray-200 hover:border-gray-300"
							}`}
						>
							<NextImage
								src={image.url}
								alt={image.alt || `${productName} thumbnail ${index + 1}`}
								width={80}
								height={80}
								className="h-full w-full object-cover"
							/>
						</button>
					))}
				</div>
			)}

			{/* Image Modal */}
			<ImageModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				images={displayImages}
				initialIndex={currentIndex}
			/>
		</div>
	);
};
