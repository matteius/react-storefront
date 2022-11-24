import { OrderFragment, useOrderQuery } from "@/checkout-storefront/graphql";
import { useLocale } from "@/checkout-storefront/hooks/useLocale";

export const useOrder = (id: string) => {
  const { locale } = useLocale();

  const [{ data, fetching: loading }] = useOrderQuery({
    variables: { languageCode: "EN_US", id },
  });

  return { order: data?.order as OrderFragment, loading };
};
