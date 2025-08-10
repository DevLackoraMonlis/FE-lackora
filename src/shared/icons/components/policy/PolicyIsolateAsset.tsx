import { type Ref, type SVGProps, forwardRef, memo } from "react";
const SvgPolicyIsolateAsset = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		fill="none"
		viewBox="0 0 41 40"
		ref={ref}
		{...props}
	>
		<path
			fill="url(#PolicyIsolateAsset_svg__a)"
			d="M20.5 3.333C11.296 3.333 3.834 10.796 3.834 20S11.296 36.667 20.5 36.667 37.167 29.204 37.167 20 29.704 3.333 20.5 3.333m0 28.334c-6.443 0-11.666-5.224-11.666-11.667S14.057 8.333 20.5 8.333 32.167 13.557 32.167 20 26.943 31.667 20.5 31.667"
		/>
		<path fill="url(#PolicyIsolateAsset_svg__b)" d="m11.642 32.392-3.535-3.535 21.25-21.25 3.535 3.535z" />
		<defs>
			<linearGradient
				id="PolicyIsolateAsset_svg__a"
				x1={8.677}
				x2={32.468}
				y1={8.177}
				y2={31.967}
				gradientUnits="userSpaceOnUse"
			>
				<stop stopColor="#F44F5A" />
				<stop offset={0.443} stopColor="#EE3D4A" />
				<stop offset={1} stopColor="#E52030" />
			</linearGradient>
			<linearGradient
				id="PolicyIsolateAsset_svg__b"
				x1={6.062}
				x2={34.612}
				y1={5.562}
				y2={34.112}
				gradientUnits="userSpaceOnUse"
			>
				<stop stopColor="#F44F5A" />
				<stop offset={0.443} stopColor="#EE3D4A" />
				<stop offset={1} stopColor="#E52030" />
			</linearGradient>
		</defs>
	</svg>
);
const ForwardRef = forwardRef(SvgPolicyIsolateAsset);
const Memo = memo(ForwardRef);
export default Memo;
