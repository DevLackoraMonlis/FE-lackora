import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgTr = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 8" width="1em" height="1em" ref={ref} {...props}>
		<path fill="#E30A17" d="M0 0h12v8H0z" />
		<circle cx={4.25} cy={4} r={2} fill="#fff" />
		<circle cx={4.75} cy={4} r={1.6} fill="#e30a17" />
		<path fill="#fff" d="m5.833 4 1.81.588-1.119-1.54v1.903l1.118-1.539z" />
	</svg>
);
const ForwardRef = forwardRef(SvgTr);
const Memo = memo(ForwardRef);
export default Memo;
