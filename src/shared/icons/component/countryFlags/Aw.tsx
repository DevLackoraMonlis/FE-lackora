import * as React from "react";
import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgAw = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 27 18"
		width="1em"
		height="1em"
		ref={ref}
		{...props}
	>
		<path fill="#418fde" d="M0 0h27v18H0V0z" />
		<path fill="#ffd100" d="M0 12h27v1H0v1h27v1H0v-3z" />
		<path
			fill="#EF3340"
			stroke="#FFF"
			strokeMiterlimit={10}
			strokeWidth={0.2}
			d="M4.625 3.375 4 1.35l-.625 2.025L1.35 4l2.025.625L4 6.65l.625-2.025L6.65 4z"
		/>
	</svg>
);
const ForwardRef = forwardRef(SvgAw);
const Memo = memo(ForwardRef);
export default Memo;
