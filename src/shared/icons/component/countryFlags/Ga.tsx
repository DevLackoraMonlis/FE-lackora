import * as React from "react";
import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgGa = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 400 300"
		width="1em"
		height="1em"
		ref={ref}
		{...props}
	>
		<path fill="#3a75c4" d="M0 0h400v300H0z" />
		<path fill="#fcd116" d="M0 0h400v200H0z" />
		<path fill="#009e60" d="M0 0h400v100H0z" />
	</svg>
);
const ForwardRef = forwardRef(SvgGa);
const Memo = memo(ForwardRef);
export default Memo;
