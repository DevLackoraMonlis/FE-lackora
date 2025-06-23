import * as React from "react";
import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgBh = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 1500 900"
		width="1em"
		height="1em"
		ref={ref}
		{...props}
	>
		<path fill="#fff" d="M0 0h1500v900H0" />
		<path
			fill="#ce1126"
			d="M1500 0H375l225 90-225 90 225 90-225 90 225 90-225 90 225 90-225 90 225 90-225 90h1125"
		/>
	</svg>
);
const ForwardRef = forwardRef(SvgBh);
const Memo = memo(ForwardRef);
export default Memo;
