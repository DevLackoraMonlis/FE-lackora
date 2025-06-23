import * as React from "react";
import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgMu = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 6 4"
		width="1em"
		height="1em"
		ref={ref}
		{...props}
	>
		<path fill="#00A551" d="M0 0h6v4H0z" />
		<path fill="#FFD500" d="M0 0h6v3H0z" />
		<path fill="#1A206D" d="M0 0h6v2H0z" />
		<path fill="#EA2839" d="M0 0h6v1H0z" />
	</svg>
);
const ForwardRef = forwardRef(SvgMu);
const Memo = memo(ForwardRef);
export default Memo;
