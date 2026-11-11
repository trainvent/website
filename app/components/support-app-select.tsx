"use client";

import { useEffect, useRef, type ReactNode } from "react";

const appQueryParameter = "app";

export default function SupportAppSelect({ children }: { children: ReactNode }) {
	const selectRef = useRef<HTMLSelectElement>(null);

	useEffect(() => {
		const app = new URLSearchParams(window.location.search).get(appQueryParameter);
		const select = selectRef.current;
		if (app && select && Array.from(select.options).some(option => option.value === app)) {
			select.value = app;
		}
	}, []);

	return <select ref={selectRef} name="app" required defaultValue="">{children}</select>;
}
