import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgVn = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		xmlnsXlink="http://www.w3.org/1999/xlink"
		viewBox="-15 -10 30 20"
		width="1em"
		height="1em"
		ref={ref}
		{...props}
	>
		<path fill="#DA251d" d="M-20-15h40v30h-40z" />
		<g id="vn_svg__b" transform="translate(0 -6)">
			<path id="vn_svg__a" fill="#FF0" d="M0 0v6h4" transform="rotate(18)" />
			<use xlinkHref="#vn_svg__a" transform="scale(-1 1)" />
		</g>
		<g id="vn_svg__c" transform="rotate(72)">
			<use xlinkHref="#vn_svg__b" />
			<use xlinkHref="#vn_svg__b" transform="rotate(72)" />
		</g>
		<use xlinkHref="#vn_svg__c" transform="scale(-1 1)" />
	</svg>
);
const ForwardRef = forwardRef(SvgVn);
const Memo = memo(ForwardRef);
export default Memo;
