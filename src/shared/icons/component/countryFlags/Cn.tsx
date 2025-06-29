import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgCn = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		xmlnsXlink="http://www.w3.org/1999/xlink"
		viewBox="0 0 30 20"
		width="1em"
		height="1em"
		ref={ref}
		{...props}
	>
		<defs>
			<path id="cn_svg__a" fill="#FF0" d="M0-1 .588.809-.952-.309H.952L-.588.809z" />
		</defs>
		<path fill="#EE1C25" d="M0 0h30v20H0z" />
		<use xlinkHref="#cn_svg__a" transform="matrix(3 0 0 3 5 5)" />
		<use xlinkHref="#cn_svg__a" transform="rotate(23.036 .093 25.536)" />
		<use xlinkHref="#cn_svg__a" transform="rotate(45.87 1.273 16.18)" />
		<use xlinkHref="#cn_svg__a" transform="rotate(69.945 .996 12.078)" />
		<use xlinkHref="#cn_svg__a" transform="rotate(20.66 -19.689 31.932)" />
	</svg>
);
const ForwardRef = forwardRef(SvgCn);
const Memo = memo(ForwardRef);
export default Memo;
