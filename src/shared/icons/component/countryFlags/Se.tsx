import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgSe = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 10" width="1em" height="1em" ref={ref} {...props}>
		<path fill="#006aa7" d="M0 0h16v10H0z" />
		<path fill="#fecc00" d="M5 0h2v10H5z" />
		<path fill="#fecc00" d="M0 4h16v2H0z" />
	</svg>
);
const ForwardRef = forwardRef(SvgSe);
const Memo = memo(ForwardRef);
export default Memo;
