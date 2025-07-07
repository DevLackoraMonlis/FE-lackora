import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgBw = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 24" width="1em" height="1em" ref={ref} {...props}>
		<path fill="#6DA9D2" d="M0 0h36v24H0z" />
		<path fill="#fff" d="M0 9h36v6H0z" />
		<path d="M0 10h36v4H0z" />
	</svg>
);
const ForwardRef = forwardRef(SvgBw);
const Memo = memo(ForwardRef);
export default Memo;
