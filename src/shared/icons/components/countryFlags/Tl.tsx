import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgTl = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 1200 600"
		width="1em"
		height="1em"
		ref={ref}
		{...props}
	>
		<path fill="#dc241f" d="M1200 600V0H0v600z" />
		<path fill="#ffc726" d="M0 0v600l600-300z" />
		<path d="M0 0v600l400-300z" />
		<path
			fill="#fff"
			d="m92.858 208.928 19.76 189.181 95.212-164.663-173.817 77.251 186.025 39.67-127.18-141.44"
		/>
	</svg>
);
const ForwardRef = forwardRef(SvgTl);
const Memo = memo(ForwardRef);
export default Memo;
