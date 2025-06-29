import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgPl = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 10" width="1em" height="1em" ref={ref} {...props}>
		<path fill="#fff" d="M0 0h16v10H0z" />
		<path fill="#dc143c" d="M0 5h16v5H0z" />
	</svg>
);
const ForwardRef = forwardRef(SvgPl);
const Memo = memo(ForwardRef);
export default Memo;
