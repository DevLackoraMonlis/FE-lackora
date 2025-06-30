import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgAg = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		xmlnsXlink="http://www.w3.org/1999/xlink"
		viewBox="0 0 138 92"
		width="1em"
		height="1em"
		ref={ref}
		{...props}
	>
		<path fill="#fff" d="M0 0h138v92H0z" />
		<path d="M0 0h138v46H0z" />
		<g transform="translate(69 36)">
			<g id="ag_svg__b">
				<path id="ag_svg__a" fill="#fcd116" d="M-30 0 0-5.742V5.742z" />
				<use xlinkHref="#ag_svg__a" transform="rotate(22.5)" />
				<use xlinkHref="#ag_svg__a" transform="rotate(45)" />
			</g>
			<use xlinkHref="#ag_svg__b" transform="rotate(67.5)" />
			<use xlinkHref="#ag_svg__b" transform="rotate(135)" />
		</g>
		<path fill="#0072c6" d="M0 36h138v20H0z" />
		<path fill="#ce1126" d="M0 0v92h138V0L69 92z" />
	</svg>
);
const ForwardRef = forwardRef(SvgAg);
const Memo = memo(ForwardRef);
export default Memo;
