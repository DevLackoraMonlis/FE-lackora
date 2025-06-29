import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgAt = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 9 6"
		width="1em"
		height="1em"
		ref={ref}
		{...props}
	>
		<path fill="#ed2939" d="M0 0h9v6H0z" />
		<path fill="#fff" d="M0 2h9v2H0z" />
	</svg>
);
const ForwardRef = forwardRef(SvgAt);
const Memo = memo(ForwardRef);
export default Memo;
