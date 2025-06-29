import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgBj = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 3 2"
		width="1em"
		height="1em"
		ref={ref}
		{...props}
	>
		<path fill="#E8112D" d="M0 0h3v2H0z" />
		<path fill="#FCD116" d="M0 0h3v1H0z" />
		<path fill="#008751" d="M0 0h1.2v2H0z" />
	</svg>
);
const ForwardRef = forwardRef(SvgBj);
const Memo = memo(ForwardRef);
export default Memo;
