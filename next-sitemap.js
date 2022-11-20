const excludedPaths = ["/cart", "/checkout", "/account/*"];

module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_VERCEL_URL,
  generateRobotsTxt: true,
  exclude: excludedPaths + ["/[sitemap]", "sitemap.xml"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: "*",
        disallow: excludedPaths,
      },
    ],
    additionalSitemaps: [
      `${process.env.NEXT_PUBLIC_VERCEL_URL  }/category`,
      `${process.env.NEXT_PUBLIC_VERCEL_URL  }/collection`,
      `${process.env.NEXT_PUBLIC_VERCEL_URL  }/product`,
    ],
  },
};
