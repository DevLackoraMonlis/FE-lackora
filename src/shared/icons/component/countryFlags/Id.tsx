import * as React from "react";
import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgId = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 3 2"
		width="1em"
		height="1em"
		ref={ref}
		{...props}
	>
		<path fill="#fff" d="M0 0h3v2H0z" />
		<path fill="red" d="M0 0h3v1H0z" />
	</svg>
);
const ForwardRef = forwardRef(SvgId);
const Memo = memo(ForwardRef);
export default Memo;
