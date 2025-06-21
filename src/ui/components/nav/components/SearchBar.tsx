import { redirect } from "next/navigation";
import { SearchIcon } from "lucide-react";

export const SearchBar = ({ channel }: { channel: string }) => {
	async function onSubmit(formData: FormData) {
		"use server";
		const search = formData.get("search") as string;
		if (search && search.trim().length > 0) {
			redirect(`/${encodeURIComponent(channel)}/search?query=${encodeURIComponent(search)}`);
		}
	}

	return (
		<form
			action={onSubmit}
			className="group relative my-2 flex w-full items-center justify-items-center text-sm"
		>
			<label className="w-full">
				<span className="sr-only">search for products</span>
				<input
					type="text"
					name="search"
					placeholder="Search for products..."
					autoComplete="on"
					required
					className="h-10 w-full rounded-lg border border-white/30 bg-white/90 px-4 py-2 pr-10 text-sm text-gray-800 shadow-sm backdrop-blur-sm transition-all duration-300 placeholder:text-gray-500 hover:bg-white hover:shadow-md focus:border-white focus:bg-white focus:shadow-lg focus:shadow-gold-400/20 focus:ring-2 focus:ring-white/50"
				/>
			</label>
			<div className="absolute inset-y-0 right-0">
				<button
					type="submit"
					className="inline-flex aspect-square w-10 items-center justify-center text-gray-600 transition-all duration-300 hover:scale-110 hover:text-gray-800 focus:scale-110 focus:text-gray-800 group-invalid:pointer-events-none group-invalid:opacity-80"
				>
					<span className="sr-only">search</span>
					<SearchIcon aria-hidden className="h-5 w-5 drop-shadow-sm" />
				</button>
			</div>
		</form>
	);
};
