import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgTz = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 72 48"
		width="1em"
		height="1em"
		ref={ref}
		{...props}
	>
		<defs>
			<clipPath id="tz_svg__a">
				<path d="M0 0h72v48H0z" />
			</clipPath>
		</defs>
		<path fill="#1eb53a" d="M0 48V0h72z" />
		<path fill="#00a3dd" d="M72 0v48H0z" />
		<g fill="none" clipPath="url(#tz_svg__a)">
			<path stroke="#fcd116" strokeWidth={19} d="M0 48 72 0" />
			<path stroke="#000" strokeWidth={13} d="M0 48 72 0" />
		</g>
	</svg>
);
const ForwardRef = forwardRef(SvgTz);
const Memo = memo(ForwardRef);
export default Memo;
