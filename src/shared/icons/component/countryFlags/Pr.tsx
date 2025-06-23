import * as React from "react";
import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgPr = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="#FFF"
		viewBox="0 0 900 600"
		width="1em"
		height="1em"
		ref={ref}
		{...props}
	>
		<path d="M0 0h900v600H0" />
		<path stroke="red" strokeWidth={120} d="M0 60h900m0 240H0m0 240h900" />
		<path fill="#06F" d="M0 0v600l520-300" />
		<path d="m114 382 59-183 59 183L77 269h192" />
	</svg>
);
const ForwardRef = forwardRef(SvgPr);
const Memo = memo(ForwardRef);
export default Memo;
