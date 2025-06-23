import * as React from "react";
import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgKw = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 12 6"
		width="1em"
		height="1em"
		ref={ref}
		{...props}
	>
		<path fill="#007a3d" d="M0 0h12v2H0z" />
		<path fill="#fff" d="M0 2h12v2H0z" />
		<path fill="#ce1126" d="M0 4h12v2H0z" />
		<path d="m0 0 3 2v2L0 6z" />
	</svg>
);
const ForwardRef = forwardRef(SvgKw);
const Memo = memo(ForwardRef);
export default Memo;
