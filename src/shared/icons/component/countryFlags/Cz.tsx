import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgCz = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 900 600"
		width="1em"
		height="1em"
		ref={ref}
		{...props}
	>
		<path fill="#d7141a" d="M0 0h900v600H0z" />
		<path fill="#fff" d="M0 0h900v300H0z" />
		<path fill="#11457e" d="M450 300 0 0v600z" />
	</svg>
);
const ForwardRef = forwardRef(SvgCz);
const Memo = memo(ForwardRef);
export default Memo;
