import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgLt = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 3" width="1em" height="1em" ref={ref} {...props}>
		<path fill="#BE3A34" d="M0 0h5v3H0z" />
		<path fill="#046A38" d="M0 0h5v2H0z" />
		<path fill="#FFB81C" d="M0 0h5v1H0z" />
	</svg>
);
const ForwardRef = forwardRef(SvgLt);
const Memo = memo(ForwardRef);
export default Memo;
