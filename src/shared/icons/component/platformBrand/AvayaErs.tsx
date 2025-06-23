import * as React from "react";
import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgAvayaErs = (
	props: SVGProps<SVGSVGElement>,
	ref: Ref<SVGSVGElement>,
) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		fill="none"
		viewBox="0 0 24 24"
		ref={ref}
		{...props}
	>
		<g
			fill="#ED1B2D"
			fillRule="evenodd"
			clipPath="url(#Avaya-ERS_svg__a)"
			clipRule="evenodd"
		>
			<path d="M19.67 12.298h1.521l.246.608h-2.051l-.328.7h-.907L20.4 9h.627l2.247 4.605h-.906l-1.655-3.555zM2.52 12.332h1.52l.245.608H2.234l-.328.7H1l2.247-4.606h.627l2.247 4.605h-.906L3.56 10.084zM11.063 12.332h1.52l.247.608h-2.053l-.327.7h-.906l2.247-4.606h.627l2.247 4.605h-.906l-1.655-3.555zM5.275 9.02l2.245 4.604h.628l2.246-4.605H9.49l-1.655 3.624L6.18 9.019zM15.92 15.353l3.1-6.334h-.904l-1.724 3.691-1.587-3.69H13.9l2.043 4.604-.89 1.73z" />
		</g>
		<defs>
			<clipPath id="Avaya-ERS_svg__a">
				<path fill="#fff" d="M0 0h24v24H0z" />
			</clipPath>
		</defs>
	</svg>
);
const ForwardRef = forwardRef(SvgAvayaErs);
const Memo = memo(ForwardRef);
export default Memo;
