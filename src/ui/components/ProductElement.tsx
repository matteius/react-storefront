import { LinkWithChannel } from "../atoms/LinkWithChannel";
import { ProductImageWrapper } from "@/ui/atoms/ProductImageWrapper";

import type { ProductListItemFragment } from "@/gql/graphql";
import { formatMoneyRange } from "@/lib/utils";

export function ProductElement({
	product,
	loading,
	priority,
}: { product: ProductListItemFragment } & { loading: "eager" | "lazy"; priority?: boolean }) {
	const priceDisplay = formatMoneyRange({
		start: product?.pricing?.priceRange?.start?.gross,
		stop: product?.pricing?.priceRange?.stop?.gross,
	});

	const finalPriceDisplay =
		product?.pricing?.priceRange?.start?.gross?.amount !== product?.pricing?.priceRange?.stop?.gross?.amount
			? `from ${priceDisplay}`
			: priceDisplay;

	return (
		<li
			key={product.id}
			className="relative border bg-white shadow-md hover:shadow-2xl"
			data-testid="ProductElement"
		>
			<LinkWithChannel href={`/products/${product.slug}`}>
				<div className="flex h-60 w-full flex-col rounded bg-gray-200">
					{product?.thumbnail?.url && (
						<ProductImageWrapper
							loading={loading}
							src={product.thumbnail.url}
							alt={product.thumbnail.alt ?? ""}
							width={512}
							height={512}
							sizes={"512px"}
							priority={priority}
							className="object-contain"
						/>
					)}
				</div>
				<div className="border-t border-gray-100 bg-gray-50 px-4 py-2">
					<p className="block text-base text-slate-800">{product.name}</p>
					{!!product.category && (
						<p className="block text-sm font-medium text-gray-500" data-testid="ProductElement_Category">
							{product.category.name}
						</p>
					)}
					<p className="block text-base font-medium text-gray-900" data-testid="ProductElement_PriceRange">
						{finalPriceDisplay}
					</p>
				</div>
			</LinkWithChannel>
		</li>
	);
}
