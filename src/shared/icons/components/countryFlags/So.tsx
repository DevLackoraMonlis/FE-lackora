import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgSo = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		xmlnsXlink="http://www.w3.org/1999/xlink"
		viewBox="0 0 81 54"
		width="1em"
		height="1em"
		ref={ref}
		{...props}
	>
		<path fill="#4189DD" d="M0 0h81v54H0z" />
		<g transform="matrix(13 0 0 13 40.5 27)">
			<g id="so_svg__b">
				<path id="so_svg__a" fill="#FFF" d="M0 0v1h.5z" transform="rotate(18 3.157 -.5)" />
				<use xlinkHref="#so_svg__a" transform="scale(-1 1)" />
			</g>
			<use xlinkHref="#so_svg__b" transform="rotate(72)" />
			<use xlinkHref="#so_svg__b" transform="rotate(-72)" />
			<use xlinkHref="#so_svg__b" transform="rotate(144)" />
			<use xlinkHref="#so_svg__b" transform="rotate(-144)" />
		</g>
	</svg>
);
const ForwardRef = forwardRef(SvgSo);
const Memo = memo(ForwardRef);
export default Memo;
