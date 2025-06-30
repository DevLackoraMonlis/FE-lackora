import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgCw = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		xmlnsXlink="http://www.w3.org/1999/xlink"
		viewBox="0 0 54 36"
		width="1em"
		height="1em"
		ref={ref}
		{...props}
	>
		<path fill="#002b7f" d="M0 0h54v36H0z" />
		<path fill="#f9e814" d="M0 22.5h54V27H0z" />
		<g id="cw_svg__d" fill="#fff">
			<g id="cw_svg__c">
				<g id="cw_svg__b">
					<path id="cw_svg__a" d="M12 8v4h2z" transform="rotate(18 12 8)" />
					<use xlinkHref="#cw_svg__a" x={-24} transform="scale(-1 1)" />
				</g>
				<use xlinkHref="#cw_svg__b" transform="rotate(72 12 12)" />
			</g>
			<use xlinkHref="#cw_svg__b" transform="rotate(-72 12 12)" />
			<use xlinkHref="#cw_svg__c" transform="rotate(144 12 12)" />
		</g>
		<use xlinkHref="#cw_svg__d" x={-4} y={-4} transform="scale(.75)" />
	</svg>
);
const ForwardRef = forwardRef(SvgCw);
const Memo = memo(ForwardRef);
export default Memo;
