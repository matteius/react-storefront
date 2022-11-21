import { LanguageSelect } from "@/checkout-storefront/sections/PageHeader/LanguageSelect";

export const PageHeader = () => {
  return (
    <div className="page-header">
      <img
        src="https://cdn.mattscoinage.com/mattscoinage/products/logo.png"
        alt="logo"
        className="logo"
      />
      <p className="text-6xl">MattsCoinage Checkout</p>
      <LanguageSelect />
    </div>
  );
};
