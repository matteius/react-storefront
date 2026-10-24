"use client";

import { useState, useEffect } from "react";
import { ProductElement } from "./ProductElement";
import { type ProductListItemFragment } from "@/gql/graphql";

export const ProductCarousel = ({
	products,
	initialIndex = 0,
}: {
	products: readonly ProductListItemFragment[];
	initialIndex?: number;
}) => {
	const [currentIndex, setCurrentIndex] = useState(initialIndex);
	const [isAutoPlaying, setIsAutoPlaying] = useState(true);

	// Auto-advance carousel every 5 seconds
	useEffect(() => {
		if (!isAutoPlaying || products.length <= 1) return;

		const interval = setInterval(() => {
			setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
		}, 5000);

		return () => clearInterval(interval);
	}, [isAutoPlaying, products.length]);

	const goToSlide = (index: number) => {
		setCurrentIndex(index);
		setIsAutoPlaying(false);
		// Resume auto-play after 10 seconds of inactivity
		setTimeout(() => setIsAutoPlaying(true), 10000);
	};

	const goToPrevious = () => {
		setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
		setIsAutoPlaying(false);
		setTimeout(() => setIsAutoPlaying(true), 10000);
	};

	const goToNext = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
		setIsAutoPlaying(false);
		setTimeout(() => setIsAutoPlaying(true), 10000);
	};

	if (products.length === 0) {
		return null;
	}

	// Show up to 3 products at a time, but don't duplicate if we have fewer products
	const getVisibleProducts = () => {
		const maxVisibleCount = Math.min(3, products.length);
		const visibleProducts = [];

		for (let i = 0; i < maxVisibleCount; i++) {
			const index = (currentIndex + i) % products.length;
			visibleProducts.push(products[index]);
		}

		return visibleProducts;
	};

	return (
		<div className="relative overflow-hidden">
			{/* Carousel Container */}
			<div className="relative">
				{/* Products Grid */}
				<div
					className={`grid gap-4 ${
						getVisibleProducts().length === 1
							? "grid-cols-1 justify-items-center"
							: getVisibleProducts().length === 2
								? "grid-cols-1 md:grid-cols-2"
								: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
					}`}
				>
					{getVisibleProducts().map((product, index) => (
						<div
							key={`${product.id}-${currentIndex}-${index}`}
							className="transform transition-all duration-500 ease-in-out"
						>
							<ProductElement
								product={product}
								priority={index === 0}
								loading={index === 0 ? "eager" : "lazy"}
							/>
						</div>
					))}
				</div>

				{/* Navigation Arrows */}
				{products.length > 3 && (
					<>
						<button
							onClick={goToPrevious}
							className="absolute left-0 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-white/90 p-3 shadow-lg transition-all duration-200 hover:bg-white hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2"
							aria-label="Previous products"
						>
							<svg className="h-6 w-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
							</svg>
						</button>
						<button
							onClick={goToNext}
							className="absolute right-0 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-white/90 p-3 shadow-lg transition-all duration-200 hover:bg-white hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2"
							aria-label="Next products"
						>
							<svg className="h-6 w-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
							</svg>
						</button>
					</>
				)}
			</div>

			{/* Dots Indicator */}
			{products.length > 3 && (
				<div className="mt-6 flex justify-center space-x-2">
					{Array.from({ length: Math.ceil(products.length / 3) }).map((_, index) => (
						<button
							key={index}
							onClick={() => goToSlide(index * 3)}
							className={`h-3 w-3 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 ${
								Math.floor(currentIndex / 3) === index
									? "bg-gold-600 shadow-lg"
									: "bg-gray-300 hover:bg-gray-400"
							}`}
							aria-label={`Go to slide ${index + 1}`}
						/>
					))}
				</div>
			)}

			{/* Auto-play indicator */}
			{products.length > 3 && (
				<div className="mt-3 flex justify-center">
					<button
						onClick={() => setIsAutoPlaying(!isAutoPlaying)}
						className="flex items-center space-x-2 rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-600 transition-colors duration-200 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2"
					>
						{isAutoPlaying ? (
							<>
								<svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
									<path
										fillRule="evenodd"
										d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zM11 8a1 1 0 112 0v4a1 1 0 11-2 0V8z"
										clipRule="evenodd"
									/>
								</svg>
								<span>Pause</span>
							</>
						) : (
							<>
								<svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
									<path
										fillRule="evenodd"
										d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
										clipRule="evenodd"
									/>
								</svg>
								<span>Play</span>
							</>
						)}
					</button>
				</div>
			)}
		</div>
	);
};
