import * as React from "react";
import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgSn = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		xmlnsXlink="http://www.w3.org/1999/xlink"
		viewBox="0 0 900 600"
		width="1em"
		height="1em"
		ref={ref}
		{...props}
	>
		<path fill="#00853f" d="M0 0h300v600H0z" />
		<path fill="#fdef42" d="M300 0h300v600H300z" />
		<path fill="#e31b23" d="M600 0h300v600H600z" />
		<g fill="#00853f" transform="translate(450 300)">
			<g id="sn_svg__b">
				<path id="sn_svg__a" d="M0-100V0h50z" transform="rotate(18 0 -100)" />
				<use xlinkHref="#sn_svg__a" transform="scale(-1 1)" />
			</g>
			<use xlinkHref="#sn_svg__b" transform="rotate(72)" />
			<use xlinkHref="#sn_svg__b" transform="rotate(144)" />
			<use xlinkHref="#sn_svg__b" transform="rotate(216)" />
			<use xlinkHref="#sn_svg__b" transform="rotate(288)" />
		</g>
	</svg>
);
const ForwardRef = forwardRef(SvgSn);
const Memo = memo(ForwardRef);
export default Memo;
