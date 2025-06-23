import * as React from "react";
import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgCg = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 3 2"
		width="1em"
		height="1em"
		ref={ref}
		{...props}
	>
		<path fill="#009543" d="M0 0h3v2H0z" />
		<path fill="#FBDE4A" d="m0 2 2-2h1v2z" />
		<path fill="#DC241F" d="M3 0v2H1z" />
	</svg>
);
const ForwardRef = forwardRef(SvgCg);
const Memo = memo(ForwardRef);
export default Memo;
