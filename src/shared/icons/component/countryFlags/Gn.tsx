import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgGn = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 3 2"
		width="1em"
		height="1em"
		ref={ref}
		{...props}
	>
		<path fill="#ce1126" d="M0 0h1v2H0z" />
		<path fill="#fcd116" d="M1 0h1v2H1z" />
		<path fill="#009460" d="M2 0h1v2H2z" />
	</svg>
);
const ForwardRef = forwardRef(SvgGn);
const Memo = memo(ForwardRef);
export default Memo;
