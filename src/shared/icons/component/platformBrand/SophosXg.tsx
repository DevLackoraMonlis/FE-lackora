import * as React from "react";
import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgSophosXg = (
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
		<g clipPath="url(#SophosXG_svg__a)">
			<g clipPath="url(#SophosXG_svg__b)">
				<path
					fill="#005BC8"
					d="M2 2v12.645c0 1.316.714 2.529 1.863 3.168l8.129 4.517 8.142-4.517a3.62 3.62 0 0 0 1.865-3.17V2zm11.877 14.575H7.263v-2.279l6.614.027c.651 0 1.183-.533 1.183-1.184s-.532-1.183-1.183-1.183h-3.67A3.446 3.446 0 0 1 6.772 8.52a3.446 3.446 0 0 1 3.435-3.435h6.615v2.279l-6.614-.027c-.651 0-1.184.533-1.184 1.183 0 .651.533 1.184 1.184 1.184h3.67a3.446 3.446 0 0 1 3.435 3.435 3.446 3.446 0 0 1-3.436 3.436"
				/>
			</g>
		</g>
		<defs>
			<clipPath id="SophosXG_svg__a">
				<path fill="#fff" d="M0 0h24v24H0z" />
			</clipPath>
			<clipPath id="SophosXG_svg__b">
				<path fill="#fff" d="M2 2h20v20.33H2z" />
			</clipPath>
		</defs>
	</svg>
);
const ForwardRef = forwardRef(SvgSophosXg);
const Memo = memo(ForwardRef);
export default Memo;
