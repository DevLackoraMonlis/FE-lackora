import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgDk = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 370 280"
		width="1em"
		height="1em"
		ref={ref}
		{...props}
	>
		<path fill="#c60c30" d="M0 0h370v280H0z" />
		<path fill="#fff" d="M120 0h40v280h-40z" />
		<path fill="#fff" d="M0 120h370v40H0z" />
	</svg>
);
const ForwardRef = forwardRef(SvgDk);
const Memo = memo(ForwardRef);
export default Memo;
