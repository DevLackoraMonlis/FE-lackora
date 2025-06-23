import * as React from "react";
import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgBe = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 45 39"
		width="1em"
		height="1em"
		ref={ref}
		{...props}
	>
		<path fill="#ED2939" d="M0 0h45v39H0z" />
		<path fill="#FAE042" d="M0 0h30v39H0z" />
		<path d="M0 0h15v39H0z" />
	</svg>
);
const ForwardRef = forwardRef(SvgBe);
const Memo = memo(ForwardRef);
export default Memo;
