import * as React from "react";
import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgGl = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 18 12"
		width="1em"
		height="1em"
		ref={ref}
		{...props}
	>
		<path fill="#fff" d="M0 0h18v12H0z" />
		<path fill="#d00c33" d="M0 6h18v6H0zm3 0a4 4 0 0 0 8 0 4 4 0 0 0-8 0" />
	</svg>
);
const ForwardRef = forwardRef(SvgGl);
const Memo = memo(ForwardRef);
export default Memo;
