import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgHu = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 6 3"
		width="1em"
		height="1em"
		ref={ref}
		{...props}
	>
		<path fill="#477050" d="M0 0h6v3H0z" />
		<path fill="#FFF" d="M0 0h6v2H0z" />
		<path fill="#CE2939" d="M0 0h6v1H0z" />
	</svg>
);
const ForwardRef = forwardRef(SvgHu);
const Memo = memo(ForwardRef);
export default Memo;
