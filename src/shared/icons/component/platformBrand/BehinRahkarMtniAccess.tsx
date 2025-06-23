import * as React from "react";
import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgBehinRahkarMtniAccess = (
	props: SVGProps<SVGSVGElement>,
	ref: Ref<SVGSVGElement>,
) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		fill="none"
		viewBox="0 0 24 24"
		ref={ref}
		{...props}
	>
		<g clipPath="url(#BehinRahkar-MTNIAccess_svg__a)">
			<g clipPath="url(#BehinRahkar-MTNIAccess_svg__b)">
				<path fill="#FFBE00" d="M2 2h20v20H2z" />
				<path
					fill="#005C87"
					d="M12 18.165c5.318 0 9.63-2.637 9.63-5.89s-4.312-5.89-9.63-5.89-9.63 2.637-9.63 5.89 4.312 5.89 9.63 5.89"
				/>
				<path
					fill="#fff"
					d="m13.727 15 .048-1.256h-1.336L12.047 15h-1.528l2.056-5.76h2.64l.032 5.76zm-.328-4.36-.632 2.032h1.048l.088-2.032zM10.756 9.24 9.748 15H8.3l1.016-5.76z"
				/>
			</g>
		</g>
		<defs>
			<clipPath id="BehinRahkar-MTNIAccess_svg__a">
				<path fill="#fff" d="M0 0h24v24H0z" />
			</clipPath>
			<clipPath id="BehinRahkar-MTNIAccess_svg__b">
				<path fill="#fff" d="M2 2h20v20H2z" />
			</clipPath>
		</defs>
	</svg>
);
const ForwardRef = forwardRef(SvgBehinRahkarMtniAccess);
const Memo = memo(ForwardRef);
export default Memo;
