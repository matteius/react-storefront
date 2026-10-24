import { TextInput } from "@/checkout/components/TextInput";
import { Title } from "@/checkout/components/Title";
import { useGuestUserForm } from "@/checkout/sections/GuestUser/useGuestUserForm";
import { FormProvider } from "@/checkout/hooks/useForm/FormProvider";

interface GuestUserProps {
	onEmailChange: (email: string) => void;
	email: string;
}

export const GuestUser: React.FC<GuestUserProps> = ({ onEmailChange, email: initialEmail }) => {
	const form = useGuestUserForm({ initialEmail });
	const { handleChange } = form;

	return (
		<div className="py-4">
			<div className="mb-2 flex flex-col">
				<Title>Contact details</Title>
			</div>
			<FormProvider form={form}>
				<div className="grid grid-cols-1 gap-3">
					<TextInput
						required
						name="email"
						label="Email"
						onChange={(event) => {
							handleChange(event);
							onEmailChange(event.currentTarget.value);
						}}
					/>
				</div>
			</FormProvider>
		</div>
	);
};
