import { object, type Schema, string } from "yup";
import { useCheckout } from "@/checkout/hooks/useCheckout";
import { useCheckoutUpdateStateChange } from "@/checkout/state/updateStateStore";
import { useCheckoutFormValidationTrigger } from "@/checkout/hooks/useCheckoutFormValidationTrigger";
import { type ChangeHandler, useForm } from "@/checkout/hooks/useForm";
import { useCheckoutEmailUpdate } from "@/checkout/sections/GuestUser/useCheckoutEmailUpdate";
import { useErrorMessages } from "@/checkout/hooks/useErrorMessages";
import { isValidEmail } from "@/checkout/lib/utils/common";

export interface GuestUserFormData {
	email: string;
}

interface GuestUserFormProps {
	initialEmail: string;
}

export const useGuestUserForm = ({ initialEmail }: GuestUserFormProps) => {
	const { checkout } = useCheckout();
	const { errorMessages } = useErrorMessages();
	const { setCheckoutUpdateState } = useCheckoutUpdateStateChange("checkoutEmailUpdate");

	const validationSchema = object({
		email: string().email(errorMessages.invalid).required(errorMessages.required),
	}) as Schema<GuestUserFormData>;

	const defaultFormData: GuestUserFormData = {
		email: initialEmail || checkout.email || "",
	};

	const form = useForm<GuestUserFormData>({
		initialValues: defaultFormData,
		onSubmit: async () => {
			// Email is updated via useCheckoutEmailUpdate hook
			// Return empty errors object to satisfy the form submission type
			return { hasErrors: false, apiErrors: [], graphqlErrors: [], customErrors: [] };
		},
		validationSchema,
		validateOnChange: true,
		validateOnBlur: false,
		initialTouched: { email: true },
	});

	const {
		values: { email },
		handleChange,
	} = form;

	useCheckoutFormValidationTrigger({
		scope: "guestUser",
		form,
	});

	useCheckoutEmailUpdate({ email });

	// since we use debounced submit, set update
	// state as "loading" right away
	const onChange: ChangeHandler = async (event) => {
		handleChange(event);

		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		const error = await isValidEmail(event.target.value as string);

		if (!error) {
			setCheckoutUpdateState("loading");
		}
	};

	return { ...form, handleChange: onChange };
};
