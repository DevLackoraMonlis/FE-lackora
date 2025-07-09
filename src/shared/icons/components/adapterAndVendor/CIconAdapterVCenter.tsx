import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgCIconAdapterVCenter = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		fill="none"
		viewBox="0 0 32 14"
		ref={ref}
		{...props}
	>
		<path
			fill="#696566"
			d="M3.354 1.282C2.952.358 1.958-.058 1.03.372.1.804-.242 1.884.178 2.808l3.898 8.874c.612 1.39 1.26 2.12 2.472 2.12 1.294 0 1.86-.796 2.472-2.12l3.434-7.834a.494.494 0 0 1 .49-.33c.292 0 .54.246.54.574v7.58c0 1.17.616 2.128 1.808 2.128 1.19 0 1.832-.96 1.832-2.126V5.47c0-1.198.82-1.974 1.936-1.974s1.858.804 1.858 1.974v6.204c0 1.168.62 2.126 1.81 2.126s1.836-.96 1.836-2.126V5.47c0-1.198.816-1.974 1.932-1.974 1.114 0 1.86.804 1.86 1.974v6.204c0 1.168.62 2.126 1.81 2.126 1.188 0 1.834-.96 1.834-2.126v-7.06C32 2.018 30.008.2 27.61.2c-2.394 0-3.894 1.736-3.894 1.736C22.916.852 21.818.202 19.96.202c-1.964 0-3.68 1.734-3.68 1.734C15.48.852 14.124.202 13 .202c-1.74 0-3.12.8-3.964 2.82L6.548 9.166z"
		/>
	</svg>
);
const ForwardRef = forwardRef(SvgCIconAdapterVCenter);
const Memo = memo(ForwardRef);
export default Memo;
