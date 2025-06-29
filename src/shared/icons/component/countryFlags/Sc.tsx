import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgSc = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 900 450"
		width="1em"
		height="1em"
		ref={ref}
		{...props}
	>
		<path fill="#d62828" d="M0 450h900V0H0z" />
		<path fill="#fcd856" d="M0 450V0h600z" />
		<path fill="#003f87" d="M0 450V0h300z" />
		<path fill="#fff" d="M0 450h900V150z" />
		<path fill="#007a3d" d="M0 450h900V300z" />
	</svg>
);
const ForwardRef = forwardRef(SvgSc);
const Memo = memo(ForwardRef);
export default Memo;
