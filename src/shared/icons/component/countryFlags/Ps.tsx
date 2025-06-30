import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgPs = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6 3" width="1em" height="1em" ref={ref} {...props}>
		<path fill="#007A3D" d="M0 0h6v3H0z" />
		<path fill="#FFF" d="M0 0h6v2H0z" />
		<path d="M0 0h6v1H0z" />
		<path fill="#CE1126" d="m0 0 2 1.5L0 3z" />
	</svg>
);
const ForwardRef = forwardRef(SvgPs);
const Memo = memo(ForwardRef);
export default Memo;
