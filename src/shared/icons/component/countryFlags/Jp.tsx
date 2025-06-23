import * as React from "react";
import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgJp = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 900 600"
		width="1em"
		height="1em"
		ref={ref}
		{...props}
	>
		<path fill="#fff" d="M0 0h900v600H0z" />
		<circle cx={450} cy={300} r={180} fill="#bc002d" />
	</svg>
);
const ForwardRef = forwardRef(SvgJp);
const Memo = memo(ForwardRef);
export default Memo;
