import * as React from "react";
import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgNg = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 6 3"
		width="1em"
		height="1em"
		ref={ref}
		{...props}
	>
		<path fill="#008751" d="M0 0h6v3H0z" />
		<path fill="#FFF" d="M2 0h2v3H2z" />
	</svg>
);
const ForwardRef = forwardRef(SvgNg);
const Memo = memo(ForwardRef);
export default Memo;
