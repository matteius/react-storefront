module.exports = {
  root: true,
  extends: ["checkout"],
  parserOptions: {
    tsconfigRootDir: __dirname,
  },

  ignorePatterns: ["saleor/api.tsx", "pnpm-lock.yaml", "graphql.schema.json", "lib/$path.ts"],
  plugins: ["formatjs"],
  rules: {
    "import/no-restricted-paths": [
      "error",
      {
        basePath: __dirname,
        zones: [
          { target: "./", from: "../../packages/" },
          { target: "./", from: "../../apps/", except: ["./storefront/"] },
        ],
      },
    ],
    "formatjs/no-offset": "error",
  },
};
