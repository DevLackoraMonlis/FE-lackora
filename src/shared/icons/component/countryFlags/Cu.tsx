import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgCu = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 800 400"
		width="1em"
		height="1em"
		ref={ref}
		{...props}
	>
		<path fill="#002a8f" d="M0 0h800v400H0z" />
		<path fill="#fff" d="M0 80h800v80H0v80h800v80H0z" />
		<path fill="#cf142b" d="M346.4 200 0 0v400z" />
		<path fill="#fff" d="m115.5 140 35.35 108.5-92.5-67h114.2l-92.5 67z" />
	</svg>
);
const ForwardRef = forwardRef(SvgCu);
const Memo = memo(ForwardRef);
export default Memo;
