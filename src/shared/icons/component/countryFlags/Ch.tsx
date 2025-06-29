import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgCh = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 32 32"
		width="1em"
		height="1em"
		ref={ref}
		{...props}
	>
		<path fill="#da291c" d="M0 0h32v32H0z" />
		<path fill="#fff" d="M13 6h6v7h7v6h-7v7h-6v-7H6v-6h7z" />
	</svg>
);
const ForwardRef = forwardRef(SvgCh);
const Memo = memo(ForwardRef);
export default Memo;
