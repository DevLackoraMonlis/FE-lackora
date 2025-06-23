import * as React from "react";
import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgEe = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 33 21"
		width="1em"
		height="1em"
		ref={ref}
		{...props}
	>
		<path fill="#FFF" d="M0 0h33v21H0z" />
		<path d="M0 0h33v14H0z" />
		<path fill="#0072CE" d="M0 0h33v7H0z" />
	</svg>
);
const ForwardRef = forwardRef(SvgEe);
const Memo = memo(ForwardRef);
export default Memo;
