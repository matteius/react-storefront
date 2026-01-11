"use client";

import { useState, useEffect, type FormEvent } from "react";

export interface BillingAddressData {
	firstName: string;
	lastName: string;
	companyName: string | null;
	streetAddress1: string;
	streetAddress2: string | null;
	city: string;
	countryArea: string | null;
	postalCode: string;
	country: string;
	phone: string | null;
}

interface BillingAddressFormProps {
	initialData?: Partial<BillingAddressData> | null;
	onSubmit: (data: BillingAddressData) => void;
	onCancel?: () => void;
	loading?: boolean;
}

const US_STATES = [
	{ code: "", name: "Select State" },
	{ code: "AL", name: "Alabama" }, { code: "AK", name: "Alaska" }, { code: "AZ", name: "Arizona" },
	{ code: "AR", name: "Arkansas" }, { code: "CA", name: "California" }, { code: "CO", name: "Colorado" },
	{ code: "CT", name: "Connecticut" }, { code: "DE", name: "Delaware" }, { code: "FL", name: "Florida" },
	{ code: "GA", name: "Georgia" }, { code: "HI", name: "Hawaii" }, { code: "ID", name: "Idaho" },
	{ code: "IL", name: "Illinois" }, { code: "IN", name: "Indiana" }, { code: "IA", name: "Iowa" },
	{ code: "KS", name: "Kansas" }, { code: "KY", name: "Kentucky" }, { code: "LA", name: "Louisiana" },
	{ code: "ME", name: "Maine" }, { code: "MD", name: "Maryland" }, { code: "MA", name: "Massachusetts" },
	{ code: "MI", name: "Michigan" }, { code: "MN", name: "Minnesota" }, { code: "MS", name: "Mississippi" },
	{ code: "MO", name: "Missouri" }, { code: "MT", name: "Montana" }, { code: "NE", name: "Nebraska" },
	{ code: "NV", name: "Nevada" }, { code: "NH", name: "New Hampshire" }, { code: "NJ", name: "New Jersey" },
	{ code: "NM", name: "New Mexico" }, { code: "NY", name: "New York" }, { code: "NC", name: "North Carolina" },
	{ code: "ND", name: "North Dakota" }, { code: "OH", name: "Ohio" }, { code: "OK", name: "Oklahoma" },
	{ code: "OR", name: "Oregon" }, { code: "PA", name: "Pennsylvania" }, { code: "RI", name: "Rhode Island" },
	{ code: "SC", name: "South Carolina" }, { code: "SD", name: "South Dakota" }, { code: "TN", name: "Tennessee" },
	{ code: "TX", name: "Texas" }, { code: "UT", name: "Utah" }, { code: "VT", name: "Vermont" },
	{ code: "VA", name: "Virginia" }, { code: "WA", name: "Washington" }, { code: "WV", name: "West Virginia" },
	{ code: "WI", name: "Wisconsin" }, { code: "WY", name: "Wyoming" },
];

const COUNTRIES = [
	{ code: "US", name: "United States" },
	{ code: "CA", name: "Canada" },
	{ code: "GB", name: "United Kingdom" },
	{ code: "AU", name: "Australia" },
	{ code: "DE", name: "Germany" },
	{ code: "FR", name: "France" },
];

export function BillingAddressForm({ initialData, onSubmit, onCancel, loading = false }: BillingAddressFormProps) {
	const [firstName, setFirstName] = useState(initialData?.firstName || "");
	const [lastName, setLastName] = useState(initialData?.lastName || "");
	const [companyName, setCompanyName] = useState(initialData?.companyName || "");
	const [streetAddress1, setStreetAddress1] = useState(initialData?.streetAddress1 || "");
	const [streetAddress2, setStreetAddress2] = useState(initialData?.streetAddress2 || "");
	const [city, setCity] = useState(initialData?.city || "");
	const [countryArea, setCountryArea] = useState(initialData?.countryArea || "");
	const [postalCode, setPostalCode] = useState(initialData?.postalCode || "");
	const [country, setCountry] = useState(initialData?.country || "US");
	const [phone, setPhone] = useState(initialData?.phone || "");
	const [errors, setErrors] = useState<Record<string, string>>({});

	useEffect(() => {
		if (initialData) {
			setFirstName(initialData.firstName || "");
			setLastName(initialData.lastName || "");
			setCompanyName(initialData.companyName || "");
			setStreetAddress1(initialData.streetAddress1 || "");
			setStreetAddress2(initialData.streetAddress2 || "");
			setCity(initialData.city || "");
			setCountryArea(initialData.countryArea || "");
			setPostalCode(initialData.postalCode || "");
			setCountry(initialData.country || "US");
			setPhone(initialData.phone || "");
		}
	}, [initialData]);

	const validate = (): boolean => {
		const newErrors: Record<string, string> = {};
		if (!firstName.trim()) newErrors.firstName = "First name is required";
		if (!lastName.trim()) newErrors.lastName = "Last name is required";
		if (!streetAddress1.trim()) newErrors.streetAddress1 = "Street address is required";
		if (!city.trim()) newErrors.city = "City is required";
		if (!postalCode.trim()) newErrors.postalCode = "ZIP/Postal code is required";
		if (!country.trim()) newErrors.country = "Country is required";
		if (country === "US" && !countryArea.trim()) newErrors.countryArea = "State is required";
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (!validate()) return;
		onSubmit({
			firstName: firstName.trim(),
			lastName: lastName.trim(),
			companyName: companyName.trim() || null,
			streetAddress1: streetAddress1.trim(),
			streetAddress2: streetAddress2.trim() || null,
			city: city.trim(),
			countryArea: countryArea.trim() || null,
			postalCode: postalCode.trim(),
			country: country.toUpperCase(),
			phone: phone.trim() || null,
		});
	};

	const inputClass = "w-full rounded-lg border border-amber-200 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 text-sm";
	const labelClass = "block text-gray-700 text-sm font-medium mb-1";
	const errorClass = "text-red-500 text-xs mt-1";

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			{/* Name Row */}
			<div className="grid grid-cols-2 gap-3">
				<div>
					<label htmlFor="firstName" className={labelClass}>First Name *</label>
					<input id="firstName" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className={inputClass} placeholder="John" disabled={loading} />
					{errors.firstName && <p className={errorClass}>{errors.firstName}</p>}
				</div>
				<div>
					<label htmlFor="lastName" className={labelClass}>Last Name *</label>
					<input id="lastName" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className={inputClass} placeholder="Doe" disabled={loading} />
					{errors.lastName && <p className={errorClass}>{errors.lastName}</p>}
				</div>
			</div>

			{/* Company (optional) */}
			<div>
				<label htmlFor="companyName" className={labelClass}>Company <span className="text-gray-400">(optional)</span></label>
				<input id="companyName" type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} className={inputClass} placeholder="Company name" disabled={loading} />
			</div>

			{/* Street Address */}
			<div>
				<label htmlFor="streetAddress1" className={labelClass}>Street Address *</label>
				<input id="streetAddress1" type="text" value={streetAddress1} onChange={(e) => setStreetAddress1(e.target.value)} className={inputClass} placeholder="123 Main St" disabled={loading} />
				{errors.streetAddress1 && <p className={errorClass}>{errors.streetAddress1}</p>}
			</div>
			<div>
				<label htmlFor="streetAddress2" className={labelClass}>Apt, Suite, etc. <span className="text-gray-400">(optional)</span></label>
				<input id="streetAddress2" type="text" value={streetAddress2} onChange={(e) => setStreetAddress2(e.target.value)} className={inputClass} placeholder="Apt 4B" disabled={loading} />
			</div>

			{/* City, State, ZIP Row */}
			<div className="grid grid-cols-3 gap-3">
				<div>
					<label htmlFor="city" className={labelClass}>City *</label>
					<input id="city" type="text" value={city} onChange={(e) => setCity(e.target.value)} className={inputClass} placeholder="New York" disabled={loading} />
					{errors.city && <p className={errorClass}>{errors.city}</p>}
				</div>
				<div>
					<label htmlFor="countryArea" className={labelClass}>State *</label>
					{country === "US" ? (
						<select id="countryArea" value={countryArea} onChange={(e) => setCountryArea(e.target.value)} className={inputClass} disabled={loading}>
							{US_STATES.map((state) => (
								<option key={state.code} value={state.code}>{state.name}</option>
							))}
						</select>
					) : (
						<input id="countryArea" type="text" value={countryArea} onChange={(e) => setCountryArea(e.target.value)} className={inputClass} placeholder="Province/State" disabled={loading} />
					)}
					{errors.countryArea && <p className={errorClass}>{errors.countryArea}</p>}
				</div>
				<div>
					<label htmlFor="postalCode" className={labelClass}>ZIP Code *</label>
					<input id="postalCode" type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} className={inputClass} placeholder="10001" disabled={loading} />
					{errors.postalCode && <p className={errorClass}>{errors.postalCode}</p>}
				</div>
			</div>

			{/* Country */}
			<div>
				<label htmlFor="country" className={labelClass}>Country *</label>
				<select id="country" value={country} onChange={(e) => setCountry(e.target.value)} className={inputClass} disabled={loading}>
					{COUNTRIES.map((c) => (
						<option key={c.code} value={c.code}>{c.name}</option>
					))}
				</select>
				{errors.country && <p className={errorClass}>{errors.country}</p>}
			</div>

			{/* Phone (optional) */}
			<div>
				<label htmlFor="phone" className={labelClass}>Phone <span className="text-gray-400">(optional)</span></label>
				<input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} placeholder="+1 (555) 123-4567" disabled={loading} />
			</div>

			{/* Buttons */}
			<div className="flex gap-3 pt-4">
				{onCancel && (
					<button type="button" onClick={onCancel} disabled={loading} className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50 disabled:opacity-50">
						Cancel
					</button>
				)}
				<button type="submit" disabled={loading} className="flex-1 rounded-lg bg-amber-500 px-4 py-2 font-medium text-white hover:bg-amber-600 disabled:opacity-50">
					{loading ? "Saving..." : "Continue to Payment"}
				</button>
			</div>
		</form>
	);
}

