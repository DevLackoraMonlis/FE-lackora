import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgGg = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		xmlnsXlink="http://www.w3.org/1999/xlink"
		viewBox="-18 -12 36 24"
		width="1em"
		height="1em"
		ref={ref}
		{...props}
	>
		<path fill="#fff" d="M-18-12h36v24h-36z" />
		<path fill="none" stroke="#e8112d" strokeWidth={6} d="M0-12v24M-18 0h36" />
		<path id="gg_svg__a" fill="#f9dd16" d="m-9 2 1-1h9v-2h-9l-1-1z" />
		<use xlinkHref="#gg_svg__a" transform="rotate(90)" />
		<use xlinkHref="#gg_svg__a" transform="rotate(-90)" />
		<use xlinkHref="#gg_svg__a" transform="rotate(180)" />
	</svg>
);
const ForwardRef = forwardRef(SvgGg);
const Memo = memo(ForwardRef);
export default Memo;
