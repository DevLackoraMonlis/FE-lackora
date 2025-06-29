import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgSl = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 9 6"
		width="1em"
		height="1em"
		ref={ref}
		{...props}
	>
		<path fill="#0072C6" d="M0 0h9v6H0z" />
		<path fill="#FFF" d="M0 0h9v4H0z" />
		<path fill="#1EB53A" d="M0 0h9v2H0z" />
	</svg>
);
const ForwardRef = forwardRef(SvgSl);
const Memo = memo(ForwardRef);
export default Memo;
