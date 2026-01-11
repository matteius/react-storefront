import { debounce } from "lodash-es";
import { useCallback, useEffect } from "react";

export const useDebouncedSubmit = <TArgs extends Array<any>>(
	onSubmit: (...args: TArgs) => Promise<any> | void,
	debounceMs = 500, // Reduced from 2000ms - faster response after blur
) => {
	const debouncedSubmit = useCallback(
		debounce((...args: TArgs) => {
			void onSubmit(...args);
		}, debounceMs),
		[onSubmit, debounceMs],
	);

	useEffect(() => {
		return () => {
			debouncedSubmit.cancel();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return debouncedSubmit;
};
