import { useRouter } from "next/router";
import React, { ReactElement, useEffect } from "react";

import { CheckoutForm, CheckoutSidebar, Layout, Spinner } from "@/components";
import { BaseSeo } from "@/components/seo/BaseSeo";
import { usePaths } from "@/lib/paths";
import { useCheckout } from "@/lib/providers/CheckoutProvider";

function CheckoutPage() {
  const router = useRouter();
  const paths = usePaths();
  const { checkout, loading } = useCheckout();

  useEffect(() => {
    // Redirect to cart if theres no checkout data
    if (!loading && (!checkout || !checkout.lines?.length)) {
      router.push(paths.cart.$url());
    }
  });

  const isCheckoutLoading = loading || typeof window === "undefined";
  if (isCheckoutLoading) {
    return (
      <>
        <Spinner />
        <BaseSeo title="Checkout" />
      </>
    );
  }

  if (!checkout || checkout.lines?.length === 0) {
    return <BaseSeo title="Checkout" />;
  }

  return (
    <>
      <BaseSeo title="Checkout" />

      <div className="py-10">
        <main>
          <div className="flex justify-center">
            <div className="md:flex grid grid-cols-1 md:grid-cols-2">
              <div className="mx-2.5 md:w-3/5">
                <CheckoutSidebar checkout={checkout} />
              </div>
              <div className="mx-2.5 md:w-3/5">
                <CheckoutForm />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default CheckoutPage;

CheckoutPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
