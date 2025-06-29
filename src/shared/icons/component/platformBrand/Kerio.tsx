import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgKerio = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		fill="none"
		viewBox="0 0 24 24"
		ref={ref}
		{...props}
	>
		<g clipPath="url(#Kerio_svg__a)">
			<path
				fill="#fff"
				d="M20.4 0H3.6A3.6 3.6 0 0 0 0 3.6v16.8A3.6 3.6 0 0 0 3.6 24h16.8a3.6 3.6 0 0 0 3.6-3.6V3.6A3.6 3.6 0 0 0 20.4 0"
			/>
			<path
				fill="#F44336"
				d="M19.778 2H4.222A2.22 2.22 0 0 0 2 4.222v15.556C2 21.005 2.995 22 4.222 22h15.556A2.22 2.22 0 0 0 22 19.778V4.222A2.22 2.22 0 0 0 19.778 2M18.11 8.118c-.072 5.558-5.546 9.701-5.779 9.875L12 18.24l-.332-.248c-.233-.174-5.707-4.317-5.78-9.875l-.006-.562h.562c3.093 0 5.203-1.541 5.224-1.557L12 5.752l.332.248c.02.014 2.13 1.556 5.223 1.556h.562z"
			/>
		</g>
		<defs>
			<clipPath id="Kerio_svg__a">
				<path fill="#fff" d="M0 0h24v24H0z" />
			</clipPath>
		</defs>
	</svg>
);
const ForwardRef = forwardRef(SvgKerio);
const Memo = memo(ForwardRef);
export default Memo;
