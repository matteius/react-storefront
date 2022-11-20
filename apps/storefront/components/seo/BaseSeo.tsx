import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import urlJoin from "url-join";

import { STOREFRONT_NAME } from "@/lib/const";

interface BaseSeoProps {
  title?: string;
  description?: string;
}

export function BaseSeo({ title, description }: BaseSeoProps) {
  const seoTitle = title ? `${title} - ${STOREFRONT_NAME}` : STOREFRONT_NAME;
  const seoDescription = description || "";

  const { asPath } = useRouter();

  const url = urlJoin(process.env.NEXT_PUBLIC_VERCEL_URL || "", asPath);

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
        url,
      }}
    />
  );
}
