import * as React from "react";
import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgKm = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		xmlnsXlink="http://www.w3.org/1999/xlink"
		viewBox="0 0 500 300"
		width="1em"
		height="1em"
		ref={ref}
		{...props}
	>
		<path fill="#3A75C4" d="M0 0h500v300H0z" />
		<path fill="#CE1126" d="M0 0h500v225H0z" />
		<path fill="#FFF" d="M0 0h500v150H0z" />
		<path fill="#FFC61E" d="M0 0h500v75H0z" />
		<path fill="#3D8E33" d="m0 300 250-150L0 0v300z" />
		<circle cx={85} cy={150} r={67.5} fill="#FFF" />
		<circle cx={115} cy={150} r={67.5} fill="#3D8E33" />
		<path
			id="km_svg__a"
			fill="#FFF"
			d="m100.01 89.2 7.36 22.588-19.258-13.949h23.776L92.63 111.788l7.38-22.588z"
		/>
		<use xlinkHref="#km_svg__a" y={32.208} />
		<use xlinkHref="#km_svg__a" y={64.417} />
		<use xlinkHref="#km_svg__a" y={96.625} />
	</svg>
);
const ForwardRef = forwardRef(SvgKm);
const Memo = memo(ForwardRef);
export default Memo;
