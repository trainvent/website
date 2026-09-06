import type { ComponentPropsWithoutRef, ReactNode } from "react";

type WagonSectionProps = ComponentPropsWithoutRef<"section"> & {
	children: ReactNode;
	terminal?: boolean;
};

function wagonClassName(
	className: string | undefined,
	terminal: boolean | undefined,
) {
	return ["wagon-panel", terminal ? "wagon-terminal" : "", className]
		.filter(Boolean)
		.join(" ");
}

export function WagonSection({
	className,
	terminal,
	children,
	...props
}: WagonSectionProps) {
	return (
		<section
			{...props}
			className={wagonClassName(`content-block ${className ?? ""}`, terminal)}
		>
			{children}
			<WagonCoupler className="wagon-coupler-external" terminal={terminal} />
		</section>
	);
}

export function WagonHero({
	className,
	terminal,
	children,
	...props
}: WagonSectionProps) {
	return (
		<div className="wagon-hero-group">
			<section
				{...props}
				className={wagonClassName(
					`hero compact-hero wagon-hero ${className ?? ""}`,
					terminal,
				)}
			>
				{children}
			</section>
			<WagonCoupler className="wagon-coupler-external" terminal={terminal} />
		</div>
	);
}

export function WagonCoupler({
	className = "wagon-coupler-inline",
	terminal = false,
}: {
	className?: string;
	terminal?: boolean;
}) {
	return (
		<span
			className={`wagon-coupler ${className}${terminal ? " wagon-terminal" : ""}`}
			aria-hidden="true"
		>
			<span className="wagon-dock wagon-dock-back" />
			<span className="wagon-damper wagon-damper-left" />
			<span className="wagon-drawbar" />
			<span className="wagon-damper wagon-damper-right" />
			<span className="wagon-dock wagon-dock-front" />
		</span>
	);
}
