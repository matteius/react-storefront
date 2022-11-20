import React from "react";
import { useIntl } from "react-intl";

import { messages } from "@/components/translations";
import { CheckoutDetailsFragment } from "@/saleor/api";

import { StripeCreditCardSection } from "./StripeCreditCardSection";

export interface PaymentSectionProps {
  checkout: CheckoutDetailsFragment;
  active: boolean;
}

export function PaymentSection({ checkout, active }: PaymentSectionProps) {
  const t = useIntl();

  return (
    <>
      <div className="mt-4 mb-4">
        <h2
          className={active ? "checkout-section-header-active" : "checkout-section-header-disabled"}
        >
          {t.formatMessage(messages.paymentCardHeader)}
        </h2>
      </div>
      {active && (
        <>
          <div className="block">
            <span className="text-slate-700 text-base">
              {t.formatMessage(messages.paymentInstruction)}
            </span>
          </div>
          <StripeCreditCardSection checkout={checkout} />
        </>
      )}
    </>
  );
}

export default PaymentSection;
