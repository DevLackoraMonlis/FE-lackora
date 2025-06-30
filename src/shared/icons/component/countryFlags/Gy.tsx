import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgGy = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 300" width="1em" height="1em" ref={ref} {...props}>
		<path fill="#009e49" d="M0 0h500v300H0z" />
		<path fill="#fff" d="m0 0 500 150L0 300z" />
		<path fill="#fcd116" d="M0 13.05 456 150 0 286.95z" />
		<path d="m0 0 250 150L0 300z" />
		<path fill="#ce1126" d="M0 17.5 220.85 150 0 282.5z" />
	</svg>
);
const ForwardRef = forwardRef(SvgGy);
const Memo = memo(ForwardRef);
export default Memo;
