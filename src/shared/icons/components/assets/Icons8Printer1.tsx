import type { SVGProps } from "react";
import { type Ref, forwardRef, memo } from "react";
const SvgIcons8Printer1 = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		fill="none"
		viewBox="0 0 16 16"
		ref={ref}
		{...props}
	>
		<path
			fill="#6D7882"
			d="M14 13.333H2a.67.67 0 0 1-.667-.666v-7A.67.67 0 0 1 2 5h12a.67.67 0 0 1 .667.667v7a.67.67 0 0 1-.667.666"
		/>
		<path fill="#0076D7" d="M13.333 5H2.667V3.667A.333.333 0 0 1 3 3.333h10a.334.334 0 0 1 .333.334z" />
		<path
			fill="#50E6FF"
			d="M4.333 1.667h7.334a.666.666 0 0 1 .666.666V5H3.667V2.333a.666.666 0 0 1 .666-.666"
		/>
		<path fill="#252525" d="M3.333 7.333h9.334a.667.667 0 0 1 .666.667v3H2.667V8a.667.667 0 0 1 .666-.667" />
		<path
			fill="url(#icons8_printer_1_svg__a)"
			d="M14.116 13.333H1.884a.67.67 0 0 1-.655-.54L.681 9.94A.792.792 0 0 1 1.46 9H14.54a.792.792 0 0 1 .778.941l-.548 2.852a.67.67 0 0 1-.655.54"
		/>
		<path fill="#000" d="M14.667 8.667H1.333V9h13.334z" opacity={0.05} />
		<path fill="#000" d="M14.667 8.833H1.333V9h13.334z" opacity={0.07} />
		<defs>
			<linearGradient
				id="icons8_printer_1_svg__a"
				x1={8}
				x2={8}
				y1={8.123}
				y2={13.407}
				gradientUnits="userSpaceOnUse"
			>
				<stop offset={0.503} stopColor="#A1AAB3" />
				<stop offset={0.658} stopColor="#9EA7AF" />
				<stop offset={0.796} stopColor="#949DA5" />
				<stop offset={0.928} stopColor="#848C92" />
				<stop offset={1} stopColor="#787F85" />
			</linearGradient>
		</defs>
	</svg>
);
const ForwardRef = forwardRef(SvgIcons8Printer1);
const Memo = memo(ForwardRef);
export default Memo;
