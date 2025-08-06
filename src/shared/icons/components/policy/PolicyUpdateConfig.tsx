import { type Ref, type SVGProps, forwardRef, memo } from "react";
const SvgPolicyUpdateConfig = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		fill="none"
		viewBox="0 0 41 40"
		ref={ref}
		{...props}
	>
		<g clipPath="url(#PolicyUpdateConfig_svg__a)">
			<path
				fill="url(#PolicyUpdateConfig_svg__b)"
				d="m29.723 6.78 4.11 5.032v-7.95c0-.44-.532-.66-.844-.35z"
			/>
			<path
				fill="url(#PolicyUpdateConfig_svg__c)"
				d="M20.5 3.333C11.31 3.333 3.834 10.81 3.834 20S11.31 36.667 20.5 36.667c3.04 0 5.888-.827 8.343-2.257a.83.83 0 0 0 .286-1.13l-1.243-2.154c-.226-.391-.728-.544-1.118-.316A12.4 12.4 0 0 1 20.5 32.5C13.608 32.5 8 26.892 8 20S13.608 7.5 20.5 7.5c2.424 0 4.677.71 6.592 1.91l-2.246 2.247c-.31.31-.09.843.35.843h7.977a.66.66 0 0 0 .66-.66v-1.798C30.792 5.98 25.956 3.333 20.5 3.333"
			/>
			<path
				fill="url(#PolicyUpdateConfig_svg__d)"
				d="M27.886 31.126c-.226-.391-.729-.544-1.119-.316a12.4 12.4 0 0 1-4.564 1.573 9.9 9.9 0 0 0 1.163 4.025 16.6 16.6 0 0 0 5.478-1.998.83.83 0 0 0 .286-1.13z"
			/>
			<path
				fill="url(#PolicyUpdateConfig_svg__e)"
				d="M40.5 31.667a8.334 8.334 0 0 1-16.666 0 8.334 8.334 0 0 1 16.666 0"
			/>
			<path
				fill="#fff"
				d="m31.038 35.295-3.333-3.333a.417.417 0 0 1 0-.59l.59-.589a.417.417 0 0 1 .588 0l2.45 2.45 4.533-4.533a.417.417 0 0 1 .589 0l.59.59a.417.417 0 0 1 0 .588l-5.418 5.417a.417.417 0 0 1-.589 0"
			/>
		</g>
		<defs>
			<radialGradient
				id="PolicyUpdateConfig_svg__b"
				cx={0}
				cy={0}
				r={1}
				gradientTransform="rotate(-134.999 14.356 5.72)scale(21.075)"
				gradientUnits="userSpaceOnUse"
			>
				<stop offset={0.752} stopColor="#076CB3" />
				<stop offset={0.825} stopColor="#138CD2" />
				<stop offset={0.865} stopColor="#1898DE" />
				<stop offset={1} stopColor="#199AE0" />
			</radialGradient>
			<radialGradient
				id="PolicyUpdateConfig_svg__d"
				cx={0}
				cy={0}
				r={1}
				gradientTransform="translate(31.077 32.315)scale(8.91333)"
				gradientUnits="userSpaceOnUse"
			>
				<stop />
				<stop offset={0.979} stopOpacity={0} />
			</radialGradient>
			<linearGradient
				id="PolicyUpdateConfig_svg__c"
				x1={16.735}
				x2={22.643}
				y1={3.852}
				y2={37.363}
				gradientUnits="userSpaceOnUse"
			>
				<stop stopColor="#32BDEF" />
				<stop offset={1} stopColor="#1EA2E4" />
			</linearGradient>
			<linearGradient
				id="PolicyUpdateConfig_svg__e"
				x1={26.274}
				x2={38.059}
				y1={25.774}
				y2={37.559}
				gradientUnits="userSpaceOnUse"
			>
				<stop stopColor="#21AD64" />
				<stop offset={1} stopColor="#088242" />
			</linearGradient>
			<clipPath id="PolicyUpdateConfig_svg__a">
				<path fill="#fff" d="M.5 0h40v40H.5z" />
			</clipPath>
		</defs>
	</svg>
);
const ForwardRef = forwardRef(SvgPolicyUpdateConfig);
const Memo = memo(ForwardRef);
export default Memo;
