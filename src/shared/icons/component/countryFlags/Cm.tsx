import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgCm = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		xmlnsXlink="http://www.w3.org/1999/xlink"
		viewBox="0 0 90 60"
		width="1em"
		height="1em"
		ref={ref}
		{...props}
	>
		<path fill="#007a5e" d="M0 0h30v60H0z" />
		<path fill="#ce1126" d="M30 0h30v60H30z" />
		<path fill="#fcd116" d="M60 0h30v60H60z" />
		<g fill="#fcd116" transform="translate(45 30)">
			<g id="cm_svg__b">
				<path id="cm_svg__a" d="M0-8v8h4z" transform="rotate(18 0 -8)" />
				<use xlinkHref="#cm_svg__a" transform="scale(-1 1)" />
			</g>
			<use xlinkHref="#cm_svg__b" transform="rotate(72)" />
			<use xlinkHref="#cm_svg__b" transform="rotate(144)" />
			<use xlinkHref="#cm_svg__b" transform="rotate(216)" />
			<use xlinkHref="#cm_svg__b" transform="rotate(288)" />
		</g>
	</svg>
);
const ForwardRef = forwardRef(SvgCm);
const Memo = memo(ForwardRef);
export default Memo;
