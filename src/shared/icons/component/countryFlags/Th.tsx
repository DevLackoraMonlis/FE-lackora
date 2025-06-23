import * as React from "react";
import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgTh = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 9 6"
		width="1em"
		height="1em"
		ref={ref}
		{...props}
	>
		<path fill="#A51931" d="M0 0h9v6H0z" />
		<path fill="#F4F5F8" d="M0 1h9v4H0z" />
		<path fill="#2D2A4A" d="M0 2h9v2H0z" />
	</svg>
);
const ForwardRef = forwardRef(SvgTh);
const Memo = memo(ForwardRef);
export default Memo;
