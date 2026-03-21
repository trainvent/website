import "server-only";

import en from "@/dictionaries/en.json";
import hr from "@/dictionaries/hr.json";
import ja from "@/dictionaries/ja.json";
import nl from "@/dictionaries/nl.json";
import type { Locale } from "@/lib/i18n";

const dictionaries = {
	en: () => Promise.resolve(en),
	de: () => import("@/dictionaries/de.json").then((module) => module.default),
	nl: () => Promise.resolve(nl),
	ja: () => Promise.resolve(ja),
	hr: () => Promise.resolve(hr),
} satisfies Record<Locale, () => Promise<typeof en>>;

export type Dictionary = typeof en;

export async function getDictionary(locale: Locale) {
	return dictionaries[locale]();
}
