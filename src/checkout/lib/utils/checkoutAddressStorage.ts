/**
 * Checkout Address Storage Utility
 * 
 * This module provides localStorage backup for checkout addresses.
 * It addresses a critical issue where addresses may not be persisted to Saleor
 * before 3DS payment redirects occur, due to the 2-second debounce on address saves.
 * 
 * The storage acts as a safety net to ensure customer contact information
 * is never lost during the checkout process.
 */

import { type AddressFragment } from "@/checkout/graphql";

const STORAGE_KEY_PREFIX = "checkout_address_backup_";
const SHIPPING_ADDRESS_KEY = "shipping";
const BILLING_ADDRESS_KEY = "billing";
const EMAIL_KEY = "email";

interface StoredCheckoutData {
	shippingAddress: AddressFragment | null;
	billingAddress: AddressFragment | null;
	email: string | null;
	checkoutId: string;
	savedAt: number;
}

/**
 * Gets the storage key for a specific checkout
 */
const getStorageKey = (checkoutId: string): string => {
	return `${STORAGE_KEY_PREFIX}${checkoutId}`;
};

/**
 * Saves checkout address data to localStorage as a backup
 */
export const saveCheckoutAddressBackup = (
	checkoutId: string,
	data: {
		shippingAddress?: AddressFragment | null;
		billingAddress?: AddressFragment | null;
		email?: string | null;
	}
): void => {
	if (typeof window === "undefined") return;
	
	try {
		const key = getStorageKey(checkoutId);
		const existing = getCheckoutAddressBackup(checkoutId);
		
		const stored: StoredCheckoutData = {
			shippingAddress: data.shippingAddress ?? existing?.shippingAddress ?? null,
			billingAddress: data.billingAddress ?? existing?.billingAddress ?? null,
			email: data.email ?? existing?.email ?? null,
			checkoutId,
			savedAt: Date.now(),
		};
		
		localStorage.setItem(key, JSON.stringify(stored));
		console.log("[AddressBackup] Saved checkout address backup:", {
			checkoutId,
			hasShipping: !!stored.shippingAddress,
			hasBilling: !!stored.billingAddress,
			hasEmail: !!stored.email,
		});
	} catch (error) {
		console.warn("[AddressBackup] Failed to save address backup:", error);
	}
};

/**
 * Retrieves checkout address backup from localStorage
 */
export const getCheckoutAddressBackup = (checkoutId: string): StoredCheckoutData | null => {
	if (typeof window === "undefined") return null;
	
	try {
		const key = getStorageKey(checkoutId);
		const stored = localStorage.getItem(key);
		
		if (!stored) return null;
		
		const data = JSON.parse(stored) as StoredCheckoutData;
		
		// Validate the data structure
		if (data.checkoutId !== checkoutId) {
			console.warn("[AddressBackup] Checkout ID mismatch, clearing backup");
			clearCheckoutAddressBackup(checkoutId);
			return null;
		}
		
		// Check if data is older than 24 hours (cleanup stale data)
		const maxAge = 24 * 60 * 60 * 1000; // 24 hours in ms
		if (Date.now() - data.savedAt > maxAge) {
			console.log("[AddressBackup] Backup data expired, clearing");
			clearCheckoutAddressBackup(checkoutId);
			return null;
		}
		
		return data;
	} catch (error) {
		console.warn("[AddressBackup] Failed to retrieve address backup:", error);
		return null;
	}
};

/**
 * Clears the checkout address backup from localStorage
 */
export const clearCheckoutAddressBackup = (checkoutId: string): void => {
	if (typeof window === "undefined") return;
	
	try {
		const key = getStorageKey(checkoutId);
		localStorage.removeItem(key);
		console.log("[AddressBackup] Cleared checkout address backup:", checkoutId);
	} catch (error) {
		console.warn("[AddressBackup] Failed to clear address backup:", error);
	}
};

/**
 * Checks if the checkout address from Saleor is missing data that we have in backup
 * This helps detect cases where the address wasn't properly saved due to debounce timing
 */
export const needsAddressRestore = (
	checkoutId: string,
	currentShippingAddress: AddressFragment | null | undefined,
	currentBillingAddress: AddressFragment | null | undefined,
): boolean => {
	const backup = getCheckoutAddressBackup(checkoutId);
	if (!backup) return false;
	
	// Check if current address is missing but we have a backup
	const missingShipping = !currentShippingAddress && backup.shippingAddress;
	const missingBilling = !currentBillingAddress && backup.billingAddress;
	
	// Check if current address is incomplete (has ID but missing critical fields)
	const incompleteShipping = currentShippingAddress?.id && 
		!currentShippingAddress.streetAddress1 && 
		backup.shippingAddress?.streetAddress1;
	const incompleteBilling = currentBillingAddress?.id && 
		!currentBillingAddress.streetAddress1 && 
		backup.billingAddress?.streetAddress1;
	
	return !!(missingShipping || missingBilling || incompleteShipping || incompleteBilling);
};

/**
 * Cleanup old backup entries (call periodically or on checkout completion)
 */
export const cleanupOldBackups = (): void => {
	if (typeof window === "undefined") return;
	
	try {
		const keys = Object.keys(localStorage).filter(key => 
			key.startsWith(STORAGE_KEY_PREFIX)
		);
		
		const maxAge = 24 * 60 * 60 * 1000; // 24 hours
		const now = Date.now();
		
		keys.forEach(key => {
			try {
				const stored = localStorage.getItem(key);
				if (stored) {
					const data = JSON.parse(stored) as StoredCheckoutData;
					if (now - data.savedAt > maxAge) {
						localStorage.removeItem(key);
					}
				}
			} catch {
				// Remove corrupted entries
				localStorage.removeItem(key);
			}
		});
	} catch (error) {
		console.warn("[AddressBackup] Failed to cleanup old backups:", error);
	}
};

