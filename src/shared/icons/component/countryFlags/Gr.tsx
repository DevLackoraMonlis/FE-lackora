import * as React from "react";
import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgGr = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 27 18"
		width="1em"
		height="1em"
		ref={ref}
		{...props}
	>
		<path fill="#0D5EAF" d="M0 0h27v18H0z" />
		<path
			fill="none"
			stroke="#FFF"
			strokeWidth={2}
			d="M5 0v11M0 5h10m0-2h17M10 7h17M0 11h27M0 15h27"
		/>
	</svg>
);
const ForwardRef = forwardRef(SvgGr);
const Memo = memo(ForwardRef);
export default Memo;
