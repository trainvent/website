import "server-only";

import en from "@/dictionaries/en.json";
import type { Locale } from "@/lib/i18n";

const dictionaries = {
	en: () => Promise.resolve(en),
	de: () => import("@/dictionaries/de.json").then((module) => module.default),
} satisfies Record<Locale, () => Promise<typeof en>>;

export type Dictionary = typeof en;

export async function getDictionary(locale: Locale) {
	return dictionaries[locale]();
}
