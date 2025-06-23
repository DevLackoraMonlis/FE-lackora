import * as React from "react";
import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgBq = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 9 6"
		width="1em"
		height="1em"
		ref={ref}
		{...props}
	>
		<path fill="#21468B" d="M0 0h9v6H0z" />
		<path fill="#FFF" d="M0 0h9v4H0z" />
		<path fill="#AE1C28" d="M0 0h9v2H0z" />
	</svg>
);
const ForwardRef = forwardRef(SvgBq);
const Memo = memo(ForwardRef);
export default Memo;
