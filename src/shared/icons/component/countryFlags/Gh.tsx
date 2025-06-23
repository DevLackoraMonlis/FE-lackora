import * as React from "react";
import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgGh = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 450 300"
		width="1em"
		height="1em"
		ref={ref}
		{...props}
	>
		<path fill="#006b3f" d="M0 0h450v300H0z" />
		<path fill="#fcd116" d="M0 0h450v200H0z" />
		<path fill="#ce1126" d="M0 0h450v100H0z" />
		<path d="m225 100 32.492 100-85.065-61.803h105.146L192.508 200z" />
	</svg>
);
const ForwardRef = forwardRef(SvgGh);
const Memo = memo(ForwardRef);
export default Memo;
