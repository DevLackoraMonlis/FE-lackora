import * as React from "react";
import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgAe = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 6 3"
		width="1em"
		height="1em"
		ref={ref}
		{...props}
	>
		<path fill="#00843D" d="M0 0h6v3H0z" />
		<path fill="#fff" d="M0 1h6v2H0z" />
		<path d="M0 2h6v1H0z" />
		<path fill="#C8102E" d="M0 0h1.5v3H0z" />
	</svg>
);
const ForwardRef = forwardRef(SvgAe);
const Memo = memo(ForwardRef);
export default Memo;
