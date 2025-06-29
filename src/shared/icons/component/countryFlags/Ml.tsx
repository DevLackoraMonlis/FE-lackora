import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgMl = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 300" width="1em" height="1em" ref={ref} {...props}>
		<path fill="#CE1126" d="M0 0h450v300H0z" />
		<path fill="#FCD116" d="M0 0h300v300H0z" />
		<path fill="#14B53A" d="M0 0h150v300H0z" />
	</svg>
);
const ForwardRef = forwardRef(SvgMl);
const Memo = memo(ForwardRef);
export default Memo;
