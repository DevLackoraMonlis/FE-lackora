import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgNe = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 700 600"
		width="1em"
		height="1em"
		ref={ref}
		{...props}
	>
		<path fill="#0DB02B" d="M0 0h700v600H0z" />
		<path fill="#FFF" d="M0 0h700v400H0z" />
		<path fill="#e05206" d="M0 0h700v200H0z" />
		<circle cx={350} cy={300} r={85} fill="#e05206" />
	</svg>
);
const ForwardRef = forwardRef(SvgNe);
const Memo = memo(ForwardRef);
export default Memo;
