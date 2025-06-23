import * as React from "react";
import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgBs = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 6 3"
		width="1em"
		height="1em"
		ref={ref}
		{...props}
	>
		<path fill="#00778B" d="M0 0h6v3H0z" />
		<path fill="#FFC72C" d="M0 1h6v1H0z" />
		<path d="M0 0v3l2.598-1.5z" />
	</svg>
);
const ForwardRef = forwardRef(SvgBs);
const Memo = memo(ForwardRef);
export default Memo;
