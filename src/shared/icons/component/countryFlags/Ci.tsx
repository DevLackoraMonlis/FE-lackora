import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgCi = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" width="1em" height="1em" ref={ref} {...props}>
		<path fill="#009e60" d="M0 0h3v2H0z" />
		<path fill="#fff" d="M0 0h2v2H0z" />
		<path fill="#f77f00" d="M0 0h1v2H0z" />
	</svg>
);
const ForwardRef = forwardRef(SvgCi);
const Memo = memo(ForwardRef);
export default Memo;
