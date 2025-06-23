import * as React from "react";
import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgRu = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 9 6"
		width="1em"
		height="1em"
		ref={ref}
		{...props}
	>
		<path fill="#fff" d="M0 0h9v3H0z" />
		<path fill="#DA291C" d="M0 3h9v3H0z" />
		<path fill="#0032A0" d="M0 2h9v2H0z" />
	</svg>
);
const ForwardRef = forwardRef(SvgRu);
const Memo = memo(ForwardRef);
export default Memo;
