import * as React from "react";
import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgFortinetOs = (
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
		<g clipPath="url(#FortinetOS_svg__a)">
			<path
				fill="#EE3124"
				d="M2 10.298h5.658v3.712H2zm7.222-5.275h5.556v3.712H9.222zm0 10.528h5.556v3.712H9.222zm7.109-5.253h5.68v3.712h-5.68zM4.328 5.023C3.148 5.326 2.225 6.643 2 8.33v.416h5.658V5.023zM2 15.55v.461c.202 1.609 1.069 2.891 2.182 3.251H7.67v-3.712zm20-6.816v-.417c-.225-1.664-1.147-2.992-2.328-3.307H16.32v3.712H22zm-2.182 10.55c1.102-.382 1.968-1.642 2.182-3.25v-.461h-5.68v3.712z"
			/>
		</g>
		<defs>
			<clipPath id="FortinetOS_svg__a">
				<path fill="#fff" d="M2 5h20v14.286H2z" />
			</clipPath>
		</defs>
	</svg>
);
const ForwardRef = forwardRef(SvgFortinetOs);
const Memo = memo(ForwardRef);
export default Memo;
