import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgAntiDDoS = (
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
		<g fill="#000" clipPath="url(#AntiDDoS_svg__a)">
			<path d="m10.669 18.913 1.425-6.175H8.175l3.919-7.72-.356 5.938h4.156z" />
			<path d="M11.738 4.306H19.1c0 3.325-.475 12.113-7.6 16.269-6.175-3.8-7.838-11.4-7.481-16.269zm0-1.306H2.83C2 8.344 3.781 17.725 11.5 22c7.837-4.156 9.263-13.656 8.788-19z" />
		</g>
		<defs>
			<clipPath id="AntiDDoS_svg__a">
				<path fill="#fff" d="M2 3h19v19H2z" />
			</clipPath>
		</defs>
	</svg>
);
const ForwardRef = forwardRef(SvgAntiDDoS);
const Memo = memo(ForwardRef);
export default Memo;
