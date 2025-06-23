import * as React from "react";
import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgFm = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		xmlnsXlink="http://www.w3.org/1999/xlink"
		viewBox="-19 -10 38 20"
		width="1em"
		height="1em"
		ref={ref}
		{...props}
	>
		<path fill="#75b2dd" d="M-19-10h38v20h-38z" />
		<g id="fm_svg__c" fill="#fff" transform="translate(0 -6)">
			<g id="fm_svg__b">
				<path id="fm_svg__a" d="M0-2v2h1" transform="rotate(18 0 -2)" />
				<use xlinkHref="#fm_svg__a" transform="scale(-1 1)" />
			</g>
			<use xlinkHref="#fm_svg__b" transform="rotate(72)" />
			<use xlinkHref="#fm_svg__b" transform="rotate(144)" />
			<use xlinkHref="#fm_svg__b" transform="rotate(216)" />
			<use xlinkHref="#fm_svg__b" transform="rotate(288)" />
		</g>
		<use xlinkHref="#fm_svg__c" transform="rotate(90)" />
		<use xlinkHref="#fm_svg__c" transform="rotate(180)" />
		<use xlinkHref="#fm_svg__c" transform="rotate(270)" />
	</svg>
);
const ForwardRef = forwardRef(SvgFm);
const Memo = memo(ForwardRef);
export default Memo;
