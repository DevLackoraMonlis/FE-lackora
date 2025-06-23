import * as React from "react";
import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgSd = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 12 6"
		width="1em"
		height="1em"
		ref={ref}
		{...props}
	>
		<path d="M0 0h12v6H0z" />
		<path fill="#FFF" d="M0 0h12v4H0z" />
		<path fill="#D21034" d="M0 0h12v2H0z" />
		<path fill="#007229" d="m0 0 4 3-4 3z" />
	</svg>
);
const ForwardRef = forwardRef(SvgSd);
const Memo = memo(ForwardRef);
export default Memo;
