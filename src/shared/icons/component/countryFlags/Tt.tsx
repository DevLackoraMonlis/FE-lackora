import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgTt = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 30 18"
		width="1em"
		height="1em"
		ref={ref}
		{...props}
	>
		<path fill="#CE1126" d="M0 0h30v18H0z" />
		<path fill="#FFF" d="m0 0 20.825 18H30L9.175 0z" />
		<path d="m1.53 0 20.824 18h6.117L7.646 0z" />
	</svg>
);
const ForwardRef = forwardRef(SvgTt);
const Memo = memo(ForwardRef);
export default Memo;
