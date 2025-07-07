import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgFi = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 1800 1100"
		width="1em"
		height="1em"
		ref={ref}
		{...props}
	>
		<path fill="#fff" d="M0 0h1800v1100H0z" />
		<path fill="#003580" d="M0 400h1800v300H0z" />
		<path fill="#003580" d="M500 0h300v1100H500z" />
	</svg>
);
const ForwardRef = forwardRef(SvgFi);
const Memo = memo(ForwardRef);
export default Memo;
