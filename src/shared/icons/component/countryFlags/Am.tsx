import * as React from "react";
import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgAm = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 6 3"
		width="1em"
		height="1em"
		ref={ref}
		{...props}
	>
		<path fill="#F2A800" d="M0 0h6v3H0z" />
		<path fill="#0033A0" d="M0 0h6v2H0z" />
		<path fill="#D90012" d="M0 0h6v1H0z" />
	</svg>
);
const ForwardRef = forwardRef(SvgAm);
const Memo = memo(ForwardRef);
export default Memo;
