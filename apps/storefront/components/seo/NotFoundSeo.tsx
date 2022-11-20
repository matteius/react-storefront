import { NextSeo } from "next-seo";

import { STOREFRONT_NAME } from "@/lib/const";

export function NotFoundSeo() {
  const title = `Page Not found - ${STOREFRONT_NAME}`;
  const description = "Page not found.";

  return (
    <NextSeo
      title={title}
      description={description}
      openGraph={{
        title,
        description,
        images: [
          {
            url: "https://cdn.mattscoinage.com/HeroImage.jpg",
            alt: "MattsCoinage.com an online store with quality coins for sale",
          },
        ],
        site_name: "www.MattsCoinage.com",
      }}
    />
  );
}

export default NotFoundSeo;
