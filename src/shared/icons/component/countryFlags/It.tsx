import * as React from "react";
import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgIt = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 3 2"
		width="1em"
		height="1em"
		ref={ref}
		{...props}
	>
		<path fill="#008C45" d="M0 0h1v2H0z" />
		<path fill="#fff" d="M1 0h1v2H1z" />
		<path fill="#CD212A" d="M2 0h1v2H2z" />
	</svg>
);
const ForwardRef = forwardRef(SvgIt);
const Memo = memo(ForwardRef);
export default Memo;
