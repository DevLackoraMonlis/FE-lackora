import * as React from "react";
import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgMc = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 5 4"
		width="1em"
		height="1em"
		ref={ref}
		{...props}
	>
		<path fill="#FFF" d="M0 0h5v4H0z" />
		<path fill="#CE1126" d="M0 0h5v2H0z" />
	</svg>
);
const ForwardRef = forwardRef(SvgMc);
const Memo = memo(ForwardRef);
export default Memo;
