import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgSr = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 900 600"
		width="1em"
		height="1em"
		ref={ref}
		{...props}
	>
		<path fill="#007A33" d="M0 0h900v600H0z" />
		<path fill="#fff" d="M0 120h900v360H0z" />
		<path fill="#C8102E" d="M0 180h900v240H0z" />
		<path
			fill="#FFCD00"
			d="m450 191.459 70.534 217.082-184.661-134.164h228.254L379.466 408.541z"
		/>
	</svg>
);
const ForwardRef = forwardRef(SvgSr);
const Memo = memo(ForwardRef);
export default Memo;
