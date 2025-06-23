import * as React from "react";
import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgBg = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 5 3"
		width="1em"
		height="1em"
		ref={ref}
		{...props}
	>
		<path fill="#fff" d="M0 0h5v3H0z" />
		<path fill="#00966E" d="M0 1h5v2H0z" />
		<path fill="#D62612" d="M0 2h5v1H0z" />
	</svg>
);
const ForwardRef = forwardRef(SvgBg);
const Memo = memo(ForwardRef);
export default Memo;
