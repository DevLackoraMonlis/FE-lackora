import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgEt = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		xmlnsXlink="http://www.w3.org/1999/xlink"
		viewBox="0 0 720 360"
		width="1em"
		height="1em"
		ref={ref}
		{...props}
	>
		<path fill="#da121a" d="M0 0h720v360H0z" />
		<path fill="#fcdd09" d="M0 0h720v240H0z" />
		<path fill="#078930" d="M0 0h720v120H0z" />
		<g transform="translate(360 180)">
			<circle r={120} fill="#0f47af" />
			<g id="et_svg__a">
				<path
					fill="#fcdd09"
					d="m0-96-4.206 12.944 17.348 53.39h-23.13l-2.599 8h74.163l11.011-8H21.553z"
				/>
				<path
					stroke="#fcdd09"
					strokeWidth={4}
					d="m25.863-35.597 30.564-42.069"
				/>
			</g>
			<use xlinkHref="#et_svg__a" transform="rotate(72)" />
			<use xlinkHref="#et_svg__a" transform="rotate(144)" />
			<use xlinkHref="#et_svg__a" transform="rotate(216)" />
			<use xlinkHref="#et_svg__a" transform="rotate(288)" />
		</g>
	</svg>
);
const ForwardRef = forwardRef(SvgEt);
const Memo = memo(ForwardRef);
export default Memo;
