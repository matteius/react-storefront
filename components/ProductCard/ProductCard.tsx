import Image from "next/image";
import Link from "next/link";
import React from "react";

import { usePaths } from "@/lib/paths";
import { translate } from "@/lib/translations";
import { ProductCardFragment } from "@/saleor/api";

import { useRegions } from "../RegionsProvider";

const styles = {
  grid: "grid grid-cols-5 gap-3",
  product: {
    name: "block text-base text-slate-800",
    category: "block text-sm font-medium text-gray-500",
    price: "block text-base font-medium text-gray-900",
    details: "px-4 py-2 border-gray-100 bg-gray-50 border-t",
  },
};

export interface ProductCardProps {
  product: ProductCardFragment;
}

export function ProductCard({ product }: ProductCardProps) {
  const paths = usePaths();
  const { formatPrice } = useRegions();

  let priceDisplay = formatPrice(product.pricing?.priceRange?.start?.gross);
  if (
    product.pricing?.priceRange?.start?.gross.amount !==
    product.pricing?.priceRange?.stop?.gross.amount
  ) {
    priceDisplay = `from ${priceDisplay}`;
  }
  return (
    <li key={product.id} className="relative bg-white border shadow-md hover:shadow-2xl">
      <Link href={paths.products._slug(product.slug).$url()} prefetch={false} passHref>
        <a href="pass">
          <div className="flex rounded flex-col  w-full h-60 bg-gray-200">
            {!!product.pricing?.onSale && (
              <>
                <br />
                <div className="bg-red-600 text-white w-1/5 text-center rounded-r-xl shadow-lg">
                  Sale
                </div>
              </>
            )}
            <Image
              src={product.thumbnail?.url || ""}
              alt={product.thumbnail?.alt || ""}
              height="100%"
              width="100%"
              layout="responsive"
              objectFit="contain"
              priority
            />
          </div>
          <div className={styles.product.details}>
            <p className={styles.product.name}>{translate(product, "name")}</p>
            {!!product.category && (
              <p className={styles.product.category}>{translate(product.category, "name")}</p>
            )}
            <p className={styles.product.price}>{priceDisplay}</p>
          </div>
        </a>
      </Link>
    </li>
  );
}
