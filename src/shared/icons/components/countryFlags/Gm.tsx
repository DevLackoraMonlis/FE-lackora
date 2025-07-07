import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgGm = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27 18" width="1em" height="1em" ref={ref} {...props}>
		<path fill="#3A7728" d="M0 0h27v18H0" />
		<path fill="#0C1C8C" d="M0 0h27v11H0" />
		<path fill="#CE1126" d="M0 0h27v6H0" />
		<path stroke="#FFF" d="M0 6.5h27m0 5H0" />
	</svg>
);
const ForwardRef = forwardRef(SvgGm);
const Memo = memo(ForwardRef);
export default Memo;
