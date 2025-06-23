import * as React from "react";
import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgDz = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 900 600"
		width="1em"
		height="1em"
		ref={ref}
		{...props}
	>
		<path fill="#fff" d="M0 0h900v600H0z" />
		<path fill="#006233" d="M0 0h450v600H0z" />
		<path
			fill="#d21034"
			d="M580 225a150 150 0 1 0 0 150 120 120 0 1 1 0-150m5 75-135-44 84 115V229l-84 115z"
		/>
	</svg>
);
const ForwardRef = forwardRef(SvgDz);
const Memo = memo(ForwardRef);
export default Memo;
