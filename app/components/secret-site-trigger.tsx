"use client";

import { useEffect } from "react";

type SecretSiteTriggerProps = {
	sequence: string;
	url: string;
};

function isTypingTarget(target: EventTarget | null) {
	if (!(target instanceof HTMLElement)) {
		return false;
	}

	const tagName = target.tagName;

	return (
		tagName === "INPUT" ||
		tagName === "TEXTAREA" ||
		tagName === "SELECT" ||
		target.isContentEditable
	);
}

export default function SecretSiteTrigger({
	sequence,
	url,
}: SecretSiteTriggerProps) {
	useEffect(() => {
		const normalizedSequence = sequence.toLowerCase();
		let buffer = "";

		function handleKeyDown(event: KeyboardEvent) {
			if (event.metaKey || event.ctrlKey || event.altKey || isTypingTarget(event.target)) {
				return;
			}

			if (event.key.length !== 1) {
				return;
			}

			buffer = `${buffer}${event.key.toLowerCase()}`.slice(-normalizedSequence.length);

			if (buffer === normalizedSequence) {
				buffer = "";
				window.open(url, "_blank", "noopener,noreferrer");
			}
		}

		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [sequence, url]);

	return null;
}
