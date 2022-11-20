import { PhotographIcon } from "@heroicons/react/outline";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { usePaths } from "@/lib/paths";
import { translate } from "@/lib/translations";
import { ProductCardFragment } from "@/saleor/api";

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

const getCardSecondaryDescription = (product: ProductCardFragment) => {
  const artistAttribute = product.attributes.find(
    (attribute) => attribute.attribute.slug === "artist"
  );
  const mainValue = artistAttribute?.values[0];
  if (mainValue?.name) {
    return mainValue.name;
  }
  if (product.category) {
    return translate(product.category, "name");
  }
  return "";
};

export function ProductCard({ product }: ProductCardProps) {
  const paths = usePaths();
  const secondaryDescription = getCardSecondaryDescription(product);
  const thumbnailUrl = product.media?.find((media) => media.type === "IMAGE")?.url;

  return (
    <li key={product.id} className="relative bg-white border shadow-md hover:shadow-2xl">
      <Link
        href={paths.products._slug(product.slug).$url()}
        prefetch={false}
        passHref
        legacyBehavior
      >
        <a href="pass">
          <div className="flex rounded flex-col  w-full h-60 bg-gray-200">
            <div className="bg-white w-full h-full relative object-contain ">
              {thumbnailUrl ? (
                <Image src={thumbnailUrl} width={512} height={512} />
		<Image
                  src={product.thumbnail?.url || ""}
                  alt={product.thumbnail?.alt || ""}
                  height="100%"
                  width="100%"
                  layout="responsive"
                  objectFit="contain"
                  priority
                />
              ) : (
                <div className="grid justify-items-center content-center h-full w-full">
                  <PhotographIcon className="h-10 w-10 content-center" />
                </div>
              )}
            </div>
          </div>
	  <div className={styles.product.details}>
            <p
              className={styles.product.name}
              data-testid={`productName${product.name}`}
            >
              {translate(product, "name")}
            </p>
            {secondaryDescription && (
              <p className="block text-md font-normal text-main underline">{secondaryDescription}</p>
            )}
            <p className={styles.product.price}>{priceDisplay}</p>
          </div>
        </a>
      </Link>
    </li>
  );
}
