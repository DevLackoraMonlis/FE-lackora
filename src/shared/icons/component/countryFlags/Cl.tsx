import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgCl = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		xmlnsXlink="http://www.w3.org/1999/xlink"
		viewBox="-4 -4 24 16"
		width="1em"
		height="1em"
		ref={ref}
		{...props}
	>
		<path fill="#d52b1e" d="M20 12H-4V-4h24z" />
		<path fill="#fff" d="M4 4h16v-8H-4z" />
		<path fill="#0039a6" d="M4 4h-8v-8h8z" />
		<g id="cl_svg__c">
			<g id="cl_svg__b">
				<path id="cl_svg__a" fill="#fff" d="M0-2v2h1z" transform="rotate(18 0 -2)" />
				<use xlinkHref="#cl_svg__a" transform="scale(-1 1)" />
			</g>
			<use xlinkHref="#cl_svg__b" transform="rotate(72)" />
		</g>
		<use xlinkHref="#cl_svg__b" transform="rotate(-72)" />
		<use xlinkHref="#cl_svg__c" transform="rotate(144)" />
	</svg>
);
const ForwardRef = forwardRef(SvgCl);
const Memo = memo(ForwardRef);
export default Memo;
