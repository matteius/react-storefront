import { NextSeo } from "next-seo";

import { STOREFRONT_NAME } from "@/lib/const";

interface BaseSeoProps {
  title?: string;
  description?: string;
}

export function BaseSeo({ title, description }: BaseSeoProps) {
  const seoTitle = title ? `${title} - ${STOREFRONT_NAME}` : STOREFRONT_NAME;
  const seoDescription = description || "";

  return (
    <NextSeo
      title={seoTitle}
      description={seoDescription}
      openGraph={{
        title: seoTitle,
        description: seoDescription,
        images: [
          {
            url: "https://cdn.mattscoinage.com/HeroImage.jpg",
            alt: "MattsCoinage.com an online store with quality coins for sale",
          },
        ],
        site_name: STOREFRONT_NAME,
      }}
    />
  );
}

export default BaseSeo;
