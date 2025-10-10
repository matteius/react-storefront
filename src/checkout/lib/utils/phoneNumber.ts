import {
	parsePhoneNumberWithError,
	type CountryCode as PhoneNumberLibCountryCode,
	type PhoneNumber,
} from "libphonenumber-js/max";
import { useCallback } from "react";
import { type CountryCode } from "@/checkout/graphql";
import { useErrorMessages } from "@/checkout/hooks/useErrorMessages";

const getPhoneNumberInstance = (phone: string, countryCode: CountryCode | undefined): PhoneNumber | null => {
	try {
		const phoneNumber = parsePhoneNumberWithError(phone, countryCode as PhoneNumberLibCountryCode);
		return phoneNumber;
	} catch (error) {
		return null;
	}
};

export const isValidPhoneNumber = (phone: string, countryCode: CountryCode | undefined) =>
	!!getPhoneNumberInstance(phone, countryCode)?.isValid();

export const usePhoneNumberValidator = (countryCode: CountryCode) => {
	const { errorMessages } = useErrorMessages();

	const isValid = useCallback(
		(phone: string) => {
			if (phone === "") {
				return undefined;
			}

			// Try validation with the provided country code first
			let valid = isValidPhoneNumber(phone, countryCode);

			// If that fails and we're dealing with US numbers, try some common US formats
			if (!valid && countryCode === "US") {
				// Remove all non-digit characters for testing
				const digitsOnly = phone.replace(/\D/g, "");

				// Check if it's a 10-digit US number (add +1 prefix)
				if (digitsOnly.length === 10) {
					valid = isValidPhoneNumber(`+1${digitsOnly}`, "US");
				}
				// Check if it's an 11-digit number starting with 1
				else if (digitsOnly.length === 11 && digitsOnly.startsWith("1")) {
					valid = isValidPhoneNumber(`+${digitsOnly}`, "US");
				}
			}

			return valid ? undefined : errorMessages.invalid;
		},
		[countryCode, errorMessages.invalid],
	);

	return isValid;
};

const isMissingCountryCallingCode = (phone: string, countryCode: CountryCode) => {
	const isValidWithoutCountryCode = isValidPhoneNumber(phone, undefined);
	const isValidWithCountryCode = isValidPhoneNumber(phone, countryCode);

	return isValidWithCountryCode && !isValidWithoutCountryCode;
};

export const getPhoneNumberWithCountryCode = (phone: string, countryCode: CountryCode) => {
	if (isMissingCountryCallingCode(phone, countryCode)) {
		const callingCode = getPhoneNumberInstance(phone, countryCode)?.countryCallingCode as string;

		return `+${callingCode}${phone}`;
	}

	return phone;
};
