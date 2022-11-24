import { PageHeader } from "@/checkout-storefront/sections/PageHeader";
import { Summary, SummarySkeleton } from "@/checkout-storefront/sections/Summary";
import { CheckoutForm, CheckoutFormSkeleton } from "@/checkout-storefront/sections/CheckoutForm";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useAuthState } from "@saleor/sdk";
import { useCheckout } from "@/checkout-storefront/hooks";
import { CheckoutSkeleton } from "./CheckoutSkeleton";
import { EmptyCartPage } from "../EmptyCartPage";
import { PageNotFound } from "../PageNotFound";

export const Checkout = () => {
  const { checkout, loading } = useCheckout();
  const { authenticating } = useAuthState();

  const isCheckoutInvalid = !loading && !checkout && !authenticating;

  const isInitiallyAuthenticating = authenticating && !checkout;

  const isEmptyCart = checkout && !checkout.lines.length;

  return <CheckoutSkeleton />;
};
