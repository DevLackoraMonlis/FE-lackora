import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgMg = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 3 2"
		width="1em"
		height="1em"
		ref={ref}
		{...props}
	>
		<path fill="#007E3A" d="M0 0h3v2H0z" />
		<path fill="#FC3D32" d="M0 0h3v1H0z" />
		<path fill="#FFF" d="M0 0h1v2H0z" />
	</svg>
);
const ForwardRef = forwardRef(SvgMg);
const Memo = memo(ForwardRef);
export default Memo;
