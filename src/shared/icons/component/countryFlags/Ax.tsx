import * as React from "react";
import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgAx = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 26 17"
		width="1em"
		height="1em"
		ref={ref}
		{...props}
	>
		<path fill="#0064AD" d="M0 0h26v17H0z" />
		<g fill="#FFD300">
			<path d="M8 0h5v17H8z" />
			<path d="M0 6h26v5H0z" />
		</g>
		<g fill="#Da0e15">
			<path d="M9.5 0h2v17h-2z" />
			<path d="M0 7.5h26v2H0z" />
		</g>
	</svg>
);
const ForwardRef = forwardRef(SvgAx);
const Memo = memo(ForwardRef);
export default Memo;
