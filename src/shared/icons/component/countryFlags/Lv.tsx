import * as React from "react";
import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgLv = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 6 3"
		width="1em"
		height="1em"
		ref={ref}
		{...props}
	>
		<path fill="#9D2235" d="M0 0h6v3H0" />
		<path fill="#FFF" d="M0 1.2h6v.6H0" />
	</svg>
);
const ForwardRef = forwardRef(SvgLv);
const Memo = memo(ForwardRef);
export default Memo;
