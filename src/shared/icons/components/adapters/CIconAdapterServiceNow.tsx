import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgCIconAdapterServiceNow = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		fill="none"
		viewBox="0 0 32 28"
		ref={ref}
		{...props}
	>
		<g clipPath="url(#CIconAdapterServiceNow_svg__a)">
			<path
				fill="#62D84E"
				fillRule="evenodd"
				d="M16.113 0C7.246 0 0 7 0 15.673c0 4.314 1.8 8.497 5.04 11.446 1.126 1.057 2.881 1.145 4.141.22 4.051-2.95 9.632-2.95 13.683 0 1.26.925 3.015.837 4.14-.22 6.436-5.987 6.706-15.937.585-22.232C24.62 1.805 20.433.044 16.113 0m-.09 23.554c-4.321.132-7.922-3.214-8.012-7.397v-.396c0-4.314 3.6-7.836 8.012-7.836 4.41 0 8.01 3.522 8.01 7.836.136 4.226-3.285 7.704-7.56 7.837-.18-.044-.316-.044-.45-.044"
				clipRule="evenodd"
			/>
		</g>
		<defs>
			<clipPath id="CIconAdapterServiceNow_svg__a">
				<path fill="#fff" d="M0 0h32v28H0z" />
			</clipPath>
		</defs>
	</svg>
);
const ForwardRef = forwardRef(SvgCIconAdapterServiceNow);
const Memo = memo(ForwardRef);
export default Memo;
