import * as React from "react";
import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgIe = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 6 3"
		width="1em"
		height="1em"
		ref={ref}
		{...props}
	>
		<path fill="#009A44" d="M0 0h6v3H0z" />
		<path fill="#fff" d="M2 0h4v3H2z" />
		<path fill="#FF8200" d="M4 0h2v3H4z" />
	</svg>
);
const ForwardRef = forwardRef(SvgIe);
const Memo = memo(ForwardRef);
export default Memo;
