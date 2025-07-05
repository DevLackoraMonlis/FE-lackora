import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgIs = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 18" width="1em" height="1em" ref={ref} {...props}>
		<path fill="#003087" d="M0 0h25v18H0z" />
		<path stroke="#FFF" strokeWidth={4} d="M0 9h25M9 0v18" />
		<path stroke="#D50032" strokeWidth={2} d="M0 9h25M9 0v18" />
	</svg>
);
const ForwardRef = forwardRef(SvgIs);
const Memo = memo(ForwardRef);
export default Memo;
