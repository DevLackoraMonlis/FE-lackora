import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgBd = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 12" width="1em" height="1em" ref={ref} {...props}>
		<path fill="#006a4e" d="M0 0h20v12H0z" />
		<circle cx={9} cy={6} r={4} fill="#f42a41" />
	</svg>
);
const ForwardRef = forwardRef(SvgBd);
const Memo = memo(ForwardRef);
export default Memo;
