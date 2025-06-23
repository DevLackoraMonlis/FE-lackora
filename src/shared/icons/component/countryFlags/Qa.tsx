import * as React from "react";
import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgQa = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 1400 550"
		width="1em"
		height="1em"
		ref={ref}
		{...props}
	>
		<path fill="#8d1b3d" d="M0 0h1400v550H0z" />
		<path
			fill="#fff"
			d="M400 550H0V0h400l100 30.556L400 61.11l100 30.556-100 30.555 100 30.556-100 30.555 100 30.556-100 30.555L500 275l-100 30.556 100 30.555-100 30.556 100 30.555-100 30.556 100 30.555-100 30.556 100 30.555z"
		/>
	</svg>
);
const ForwardRef = forwardRef(SvgQa);
const Memo = memo(ForwardRef);
export default Memo;
