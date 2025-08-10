import { type Ref, type SVGProps, forwardRef, memo } from "react";
const SvgPolicyEmail = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		fill="none"
		viewBox="0 0 41 40"
		ref={ref}
		{...props}
	>
		<g clipPath="url(#PolicyEmail_svg__a)">
			<path
				fill="url(#PolicyEmail_svg__b)"
				d="M11.928 21.563 40.5 10.384v20.554c0 .863-.71 1.562-1.588 1.562H11.928z"
			/>
			<path
				fill="url(#PolicyEmail_svg__c)"
				d="M7.167 10.384v20.554c0 .863.71 1.562 1.587 1.562h30.158c.39 0 .742-.143 1.019-.373z"
			/>
			<path
				fill="#000"
				d="M7.167 9.844H40.5v1.322L26.754 21.673a4.82 4.82 0 0 1-5.842 0L7.167 11.166z"
				opacity={0.05}
			/>
			<path
				fill="#000"
				d="M7.167 9.453H40.5v1.322L26.187 21.018a4.01 4.01 0 0 1-4.708 0L7.167 10.775z"
				opacity={0.07}
			/>
			<path
				fill="#50E6FF"
				d="M8.754 7.5h30.158c.878 0 1.588.7 1.588 1.563v1.321l-14.88 9.98a3.22 3.22 0 0 1-3.574 0l-14.88-9.98V9.062c0-.863.71-1.562 1.588-1.562"
			/>
			<path
				fill="#000"
				d="M13.417 21.667h-6.25v4.166h6.25c.689 0 1.25-.56 1.25-1.25v-1.666c0-.69-.561-1.25-1.25-1.25"
				opacity={0.05}
			/>
			<path
				fill="#000"
				d="M13.417 25.833h-6.25V30h6.25c.689 0 1.25-.56 1.25-1.25v-1.667c0-.689-.561-1.25-1.25-1.25"
				opacity={0.05}
			/>
			<path
				fill="#000"
				d="M13.417 26.25h-6.25v3.333h6.25c.46 0 .833-.374.833-.833v-1.667a.834.834 0 0 0-.834-.833M13.417 22.083h-6.25v3.334h6.25c.46 0 .833-.375.833-.834v-1.666a.834.834 0 0 0-.834-.834"
				opacity={0.07}
			/>
			<path
				fill="#000"
				d="M13.417 17.5h-6.25v4.167h6.25c.689 0 1.25-.561 1.25-1.25V18.75c0-.69-.561-1.25-1.25-1.25"
				opacity={0.05}
			/>
			<path
				fill="url(#PolicyEmail_svg__d)"
				d="M13.417 29.167H.917A.417.417 0 0 1 .5 28.75v-1.667c0-.23.187-.416.417-.416h12.5c.23 0 .416.186.416.416v1.667c0 .23-.186.417-.416.417"
			/>
			<path
				fill="#000"
				d="M13.417 17.917h-6.25v3.333h6.25c.46 0 .833-.374.833-.833V18.75a.834.834 0 0 0-.834-.833"
				opacity={0.07}
			/>
			<path
				fill="url(#PolicyEmail_svg__e)"
				d="M13.417 25H2.582a.417.417 0 0 1-.417-.417v-1.666c0-.23.187-.417.417-.417h10.834c.23 0 .416.187.416.417v1.666c0 .23-.187.417-.417.417"
			/>
			<path
				fill="url(#PolicyEmail_svg__f)"
				d="M13.417 20.833H5.083a.417.417 0 0 1-.417-.416V18.75c0-.23.187-.417.417-.417h8.334c.23 0 .416.187.416.417v1.667c0 .23-.187.416-.417.416"
			/>
		</g>
		<defs>
			<linearGradient
				id="PolicyEmail_svg__b"
				x1={21.861}
				x2={40.859}
				y1={14.927}
				y2={43.361}
				gradientUnits="userSpaceOnUse"
			>
				<stop stopColor="#28AFEA" />
				<stop offset={1} stopColor="#0B88DA" />
			</linearGradient>
			<linearGradient
				id="PolicyEmail_svg__c"
				x1={5.964}
				x2={33.553}
				y1={20.343}
				y2={37.528}
				gradientUnits="userSpaceOnUse"
			>
				<stop stopColor="#28AFEA" />
				<stop offset={1} stopColor="#0B88DA" />
			</linearGradient>
			<linearGradient
				id="PolicyEmail_svg__d"
				x1={0.5}
				x2={13.833}
				y1={27.917}
				y2={27.917}
				gradientUnits="userSpaceOnUse"
			>
				<stop stopColor="#5961C3" />
				<stop offset={1} stopColor="#3A41AC" />
			</linearGradient>
			<linearGradient
				id="PolicyEmail_svg__e"
				x1={2.167}
				x2={13.833}
				y1={23.75}
				y2={23.75}
				gradientUnits="userSpaceOnUse"
			>
				<stop stopColor="#5961C3" />
				<stop offset={1} stopColor="#3A41AC" />
			</linearGradient>
			<linearGradient
				id="PolicyEmail_svg__f"
				x1={4.667}
				x2={13.833}
				y1={19.583}
				y2={19.583}
				gradientUnits="userSpaceOnUse"
			>
				<stop stopColor="#5961C3" />
				<stop offset={1} stopColor="#3A41AC" />
			</linearGradient>
			<clipPath id="PolicyEmail_svg__a">
				<path fill="#fff" d="M.5 0h40v40H.5z" />
			</clipPath>
		</defs>
	</svg>
);
const ForwardRef = forwardRef(SvgPolicyEmail);
const Memo = memo(ForwardRef);
export default Memo;
