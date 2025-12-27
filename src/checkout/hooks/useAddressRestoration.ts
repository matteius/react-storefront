/**
 * Hook for restoring checkout addresses from localStorage backup
 * 
 * This hook is used to restore addresses that may have been lost during 3DS redirects.
 * It checks if the current checkout is missing address data that we have backed up,
 * and if so, re-saves the addresses to Saleor.
 */

import { useEffect, useRef } from "react";
import { useCheckout } from "@/checkout/hooks/useCheckout";
import {
	useCheckoutShippingAddressUpdateMutation,
	useCheckoutBillingAddressUpdateMutation,
	useCheckoutEmailUpdateMutation,
	type CountryCode,
} from "@/checkout/graphql";
import {
	getCheckoutAddressBackup,
	needsAddressRestore,
} from "@/checkout/lib/utils/checkoutAddressStorage";
import { getQueryParams } from "@/checkout/lib/utils/url";

/**
 * Converts an AddressFragment to AddressInput format for mutations
 */
const addressFragmentToInput = (address: {
	firstName?: string | null;
	lastName?: string | null;
	streetAddress1?: string | null;
	streetAddress2?: string | null;
	city?: string | null;
	countryArea?: string | null;
	postalCode?: string | null;
	phone?: string | null;
	country?: { code: string } | null;
}) => ({
	firstName: address.firstName || "",
	lastName: address.lastName || "",
	streetAddress1: address.streetAddress1 || "",
	streetAddress2: address.streetAddress2 || "",
	city: address.city || "",
	countryArea: address.countryArea || "",
	postalCode: address.postalCode || "",
	phone: address.phone || "",
	country: (address.country?.code || "US") as CountryCode,
});

export const useAddressRestoration = () => {
	const { checkout, refetch } = useCheckout();
	const [, updateShippingAddress] = useCheckoutShippingAddressUpdateMutation();
	const [, updateBillingAddress] = useCheckoutBillingAddressUpdateMutation();
	const [, updateEmail] = useCheckoutEmailUpdateMutation();
	
	// Track if we've already attempted restoration to prevent loops
	const hasAttemptedRestoration = useRef(false);
	
	useEffect(() => {
		// Only run restoration logic when returning from a payment redirect
		const { processingPayment, paymentIntent } = getQueryParams();
		
		// Skip if not returning from a redirect or already attempted
		if (!processingPayment || !paymentIntent || hasAttemptedRestoration.current) {
			return;
		}
		
		// Skip if checkout data isn't loaded yet
		if (!checkout?.id) {
			return;
		}
		
		const restoreAddresses = async () => {
			hasAttemptedRestoration.current = true;
			
			console.log("[AddressRestoration] Checking if address restoration is needed...");
			
			// Check if we need to restore addresses
			if (!needsAddressRestore(checkout.id, checkout.shippingAddress, checkout.billingAddress)) {
				console.log("[AddressRestoration] No restoration needed, addresses are intact");
				return;
			}
			
			const backup = getCheckoutAddressBackup(checkout.id);
			if (!backup) {
				console.log("[AddressRestoration] No backup found");
				return;
			}
			
			console.log("[AddressRestoration] Restoring addresses from backup...", {
				hasShippingBackup: !!backup.shippingAddress,
				hasBillingBackup: !!backup.billingAddress,
				hasEmailBackup: !!backup.email,
			});
			
			const promises: Promise<unknown>[] = [];
			
			// Restore shipping address if needed
			if (backup.shippingAddress && !checkout.shippingAddress?.streetAddress1) {
				console.log("[AddressRestoration] Restoring shipping address");
				promises.push(
					updateShippingAddress({
						checkoutId: checkout.id,
						shippingAddress: addressFragmentToInput(backup.shippingAddress),
						languageCode: "EN_US",
					}).then((result) => {
						if (result.error) {
							console.error("[AddressRestoration] Failed to restore shipping address:", result.error);
						} else {
							console.log("[AddressRestoration] Shipping address restored successfully");
						}
						return result;
					})
				);
			}
			
			// Restore billing address if needed
			if (backup.billingAddress && !checkout.billingAddress?.streetAddress1) {
				console.log("[AddressRestoration] Restoring billing address");
				promises.push(
					updateBillingAddress({
						checkoutId: checkout.id,
						billingAddress: addressFragmentToInput(backup.billingAddress),
						languageCode: "EN_US",
					}).then((result) => {
						if (result.error) {
							console.error("[AddressRestoration] Failed to restore billing address:", result.error);
						} else {
							console.log("[AddressRestoration] Billing address restored successfully");
						}
						return result;
					})
				);
			}
			
			// Restore email if needed
			if (backup.email && !checkout.email) {
				console.log("[AddressRestoration] Restoring email");
				promises.push(
					updateEmail({
						checkoutId: checkout.id,
						email: backup.email,
						languageCode: "EN_US",
					}).then((result) => {
						if (result.error) {
							console.error("[AddressRestoration] Failed to restore email:", result.error);
						} else {
							console.log("[AddressRestoration] Email restored successfully");
						}
						return result;
					})
				);
			}
			
			if (promises.length > 0) {
				await Promise.all(promises);
				console.log("[AddressRestoration] Address restoration complete, refetching checkout");
				// Refetch checkout to get updated data
				await refetch();
			}
		};
		
		void restoreAddresses();
	}, [checkout?.id, checkout?.shippingAddress, checkout?.billingAddress, checkout?.email, refetch, updateShippingAddress, updateBillingAddress, updateEmail]);
};

