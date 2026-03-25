"use client";

import { useId, useState } from "react";

type FileUploadFieldProps = {
	name: string;
	label: string;
	helpText: string;
	chooseLabel: string;
	emptyLabel: string;
	multiple?: boolean;
};

export default function FileUploadField({
	name,
	label,
	helpText,
	chooseLabel,
	emptyLabel,
	multiple = false,
}: FileUploadFieldProps) {
	const inputId = useId();
	const [fileNames, setFileNames] = useState<string[]>([]);

	return (
		<div className="field">
			<span>{label}</span>
			<div className="file-upload">
				<input
					id={inputId}
					className="file-upload-input"
					type="file"
					name={name}
					multiple={multiple}
					onChange={(event) => {
						const nextFiles = Array.from(event.target.files ?? [], (file) => file.name);
						setFileNames(nextFiles);
					}}
				/>
				<label className="btn btn-secondary file-upload-trigger" htmlFor={inputId}>
					{chooseLabel}
				</label>
				<span className="file-upload-summary" aria-live="polite">
					{fileNames.length > 0 ? fileNames.join(", ") : emptyLabel}
				</span>
			</div>
			<small className="field-help">{helpText}</small>
		</div>
	);
}
