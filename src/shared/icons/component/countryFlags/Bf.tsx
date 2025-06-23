import * as React from "react";
import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgBf = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		xmlnsXlink="http://www.w3.org/1999/xlink"
		viewBox="0 0 900 600"
		width="1em"
		height="1em"
		ref={ref}
		{...props}
	>
		<path fill="#009e49" d="M0 0h900v600H0z" />
		<path fill="#ef2b2d" d="M0 0h900v300H0z" />
		<g fill="#fcd116" transform="translate(450 300)">
			<g id="bf_svg__b">
				<path id="bf_svg__a" d="M0-100V0h50" transform="rotate(18 0 -100)" />
				<use xlinkHref="#bf_svg__a" transform="scale(-1 1)" />
			</g>
			<use xlinkHref="#bf_svg__b" transform="rotate(72)" />
			<use xlinkHref="#bf_svg__b" transform="rotate(144)" />
			<use xlinkHref="#bf_svg__b" transform="rotate(216)" />
			<use xlinkHref="#bf_svg__b" transform="rotate(288)" />
		</g>
	</svg>
);
const ForwardRef = forwardRef(SvgBf);
const Memo = memo(ForwardRef);
export default Memo;
