import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgMa = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 9 6"
		width="1em"
		height="1em"
		ref={ref}
		{...props}
	>
		<path fill="#B7312C" d="M0 0h9v6H0z" />
		<path
			fill="none"
			stroke="#006341"
			strokeWidth={0.143}
			d="m4.5 1.73.746 2.297-1.953-1.42h2.414l-1.953 1.42z"
		/>
	</svg>
);
const ForwardRef = forwardRef(SvgMa);
const Memo = memo(ForwardRef);
export default Memo;
