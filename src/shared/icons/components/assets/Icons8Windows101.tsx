import type { SVGProps } from "react";
import { type Ref, forwardRef, memo } from "react";
const SvgIcons8Windows101 = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		fill="none"
		viewBox="0 0 17 16"
		ref={ref}
		{...props}
	>
		<path
			fill="url(#icons8_windows_10_1_svg__a)"
			d="M7.417 8.342 2.42 8.333v3.668c0 .333.246.614.576.66l4.42.612z"
		/>
		<path
			fill="url(#icons8_windows_10_1_svg__b)"
			d="M8.084 8.343v5.022l6.24.863c.4.056.758-.255.758-.66l.002-5.213z"
		/>
		<path
			fill="url(#icons8_windows_10_1_svg__c)"
			d="m7.417 2.752-4.426.627a.67.67 0 0 0-.574.66l.004 3.628h4.996z"
		/>
		<path
			fill="url(#icons8_windows_10_1_svg__d)"
			d="M8.084 2.658v5.009h6.998V2.434a.666.666 0 0 0-.76-.66z"
		/>
		<defs>
			<linearGradient
				id="icons8_windows_10_1_svg__a"
				x1={3.984}
				x2={6.278}
				y1={8.706}
				y2={12.53}
				gradientUnits="userSpaceOnUse"
			>
				<stop stopColor="#1784D8" />
				<stop offset={1} stopColor="#0864C5" />
			</linearGradient>
			<linearGradient
				id="icons8_windows_10_1_svg__b"
				x1={8.951}
				x2={15.598}
				y1={9.043}
				y2={13.632}
				gradientUnits="userSpaceOnUse"
			>
				<stop stopColor="#31ABEC" />
				<stop offset={1} stopColor="#1582D5" />
			</linearGradient>
			<linearGradient
				id="icons8_windows_10_1_svg__c"
				x1={3.464}
				x2={9.346}
				y1={3.9}
				y2={9.194}
				gradientUnits="userSpaceOnUse"
			>
				<stop stopColor="#31ABEC" />
				<stop offset={1} stopColor="#1582D5" />
			</linearGradient>
			<linearGradient
				id="icons8_windows_10_1_svg__d"
				x1={9.388}
				x2={19.427}
				y1={3.382}
				y2={10.206}
				gradientUnits="userSpaceOnUse"
			>
				<stop stopColor="#54DAFF" />
				<stop offset={1} stopColor="#25A2E5" />
			</linearGradient>
		</defs>
	</svg>
);
const ForwardRef = forwardRef(SvgIcons8Windows101);
const Memo = memo(ForwardRef);
export default Memo;
