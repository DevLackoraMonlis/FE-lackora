import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgTo = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 96 48"
		width="1em"
		height="1em"
		ref={ref}
		{...props}
	>
		<g fill="#C10000">
			<path d="M0 0h96v48H0z" />
			<path fill="#fff" d="M0 0h40v24H0z" />
			<path d="M17 3h6v18h-6z" />
			<path d="M11 9h18v6H11z" />
		</g>
	</svg>
);
const ForwardRef = forwardRef(SvgTo);
const Memo = memo(ForwardRef);
export default Memo;
