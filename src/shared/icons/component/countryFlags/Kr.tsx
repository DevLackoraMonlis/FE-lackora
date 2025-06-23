import * as React from "react";
import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgKr = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		xmlnsXlink="http://www.w3.org/1999/xlink"
		viewBox="-36 -24 72 48"
		width="1em"
		height="1em"
		ref={ref}
		{...props}
	>
		<path fill="#fff" d="M-36-24h72v48h-72z" />
		<g transform="rotate(-56.31)">
			<g id="kr_svg__b">
				<path
					id="kr_svg__a"
					stroke="#000"
					strokeWidth={2}
					d="M-6-25H6m-12 3H6m-12 3H6"
				/>
				<use xlinkHref="#kr_svg__a" y={44} />
			</g>
			<path stroke="#fff" d="M0 17v10" />
			<circle r={12} fill="#cd2e3a" />
			<path
				fill="#0047a0"
				d="M0-12A6 6 0 0 0 0 0a6 6 0 0 1 0 12 12 12 0 0 1 0-24z"
			/>
		</g>
		<g transform="rotate(-123.69)">
			<use xlinkHref="#kr_svg__b" />
			<path stroke="#fff" d="M0-23.5v3M0 17v3.5m0 3v3" />
		</g>
	</svg>
);
const ForwardRef = forwardRef(SvgKr);
const Memo = memo(ForwardRef);
export default Memo;
