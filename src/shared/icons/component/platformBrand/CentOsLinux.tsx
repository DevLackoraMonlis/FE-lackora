import * as React from "react";
import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgCentOsLinux = (
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
		<g clipPath="url(#CentOS-Linux_svg__a)">
			<path
				fill="#932279"
				d="m10.396 11.239.721.716-.72.717H5.32v2.389l-3.095-3.106 3.095-3.053v2.337zm2.231-6.1h6.166v6.167h-6.166z"
			/>
			<path
				fill="#EFA724"
				d="m12.694 10.396-.717.721-.716-.72V5.32H8.872l3.105-3.095 3.053 3.095h-2.336zm-.067 2.231h6.166v6.167h-6.166z"
			/>
			<path
				fill="#262577"
				d="m13.537 12.694-.722-.717.722-.716h5.074V8.872l3.095 3.105-3.095 3.053v-2.336zm-8.398-.067h6.167v6.166H5.139z"
			/>
			<path
				fill="#9CCD2A"
				d="m11.239 13.537.716-.722.717.722v5.075h2.389l-3.106 3.095-3.053-3.095h2.337zm-6.1-8.398h6.167v6.167H5.139z"
			/>
			<path
				fill="#fff"
				d="M4.92 4.92h6.606v6.606H4.919zm.44 6.166h5.725V5.36H5.36zm7.047-6.167h6.607v6.607h-6.607zm.44 6.167h5.726V5.36h-5.726zm-.44 1.32h6.607v6.608h-6.607zm.44 6.167h5.726v-5.726h-5.726zM4.92 12.407h6.607v6.607H4.919zm.44 6.166h5.727v-5.726H5.36z"
			/>
			<path
				fill="#fff"
				d="M6.672 16.638 2 11.966l4.672-4.671 4.672 4.671zm-4.049-4.672 4.049 4.05 4.049-4.05-4.05-4.048zm9.343-.622L7.295 6.672 11.966 2l4.672 4.672zM7.918 6.672l4.048 4.049 4.05-4.05-4.05-4.048zm9.343 9.966-4.672-4.672 4.672-4.671 4.672 4.671zm-4.049-4.672 4.049 4.05 4.049-4.05-4.049-4.048zm-1.246 9.967L7.295 17.26l4.671-4.672 4.672 4.672zM7.918 17.26l4.048 4.049 4.05-4.049-4.05-4.049z"
			/>
		</g>
		<defs>
			<clipPath id="CentOS-Linux_svg__a">
				<path fill="#fff" d="M0 0h24v24H0z" />
			</clipPath>
		</defs>
	</svg>
);
const ForwardRef = forwardRef(SvgCentOsLinux);
const Memo = memo(ForwardRef);
export default Memo;
