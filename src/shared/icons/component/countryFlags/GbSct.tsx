import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgGbSct = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 3" width="1em" height="1em" ref={ref} {...props}>
		<defs>
			<clipPath id="gb-sct_svg__a">
				<path d="M0 0h5v3H0z" />
			</clipPath>
		</defs>
		<g clipPath="url(#gb-sct_svg__a)">
			<rect width="100%" height="100%" fill="#005EB8" />
			<path stroke="#fff" strokeWidth={0.6} d="m0 0 5 3M0 3l5-3" />
		</g>
	</svg>
);
const ForwardRef = forwardRef(SvgGbSct);
const Memo = memo(ForwardRef);
export default Memo;
