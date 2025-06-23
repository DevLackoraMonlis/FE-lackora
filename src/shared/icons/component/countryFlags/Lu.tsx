import * as React from "react";
import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgLu = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 10 6"
		width="1em"
		height="1em"
		ref={ref}
		{...props}
	>
		<path fill="#00A3E0" d="M0 3h10v3H0z" />
		<path fill="#EF3340" d="M0 0h10v3H0z" />
		<path fill="#fff" d="M0 2h10v2H0z" />
	</svg>
);
const ForwardRef = forwardRef(SvgLu);
const Memo = memo(ForwardRef);
export default Memo;
