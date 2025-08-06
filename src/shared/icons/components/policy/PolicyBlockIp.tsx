import { type Ref, type SVGProps, forwardRef, memo } from "react";
const SvgPolicyBlockIp = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
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
			fill="#50E6FF"
			d="M3.834 31.667v-20h33.333v20c0 .916-.75 1.666-1.667 1.666h-30c-.917 0-1.666-.75-1.666-1.666"
		/>
		<path
			fill="url(#PolicyBlockIP_svg__a)"
			d="M37.167 8.333V12.5H3.834V8.333c0-.916.75-1.666 1.666-1.666h30c.917 0 1.667.75 1.667 1.666"
		/>
		<path
			fill="url(#PolicyBlockIP_svg__b)"
			d="M14.25 10.833h20.834c.23 0 .416-.186.416-.416V8.75a.417.417 0 0 0-.416-.417H14.25a.417.417 0 0 0-.416.417v1.667c0 .23.186.416.416.416"
		/>
		<path fill="url(#PolicyBlockIP_svg__c)" d="M6.75 10.833a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5" />
		<path fill="url(#PolicyBlockIP_svg__d)" d="M10.917 10.833a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5" />
		<path
			fill="#000"
			d="M20.5 30.833c-4.365 0-7.916-3.551-7.916-7.916S16.135 15 20.5 15s7.917 3.552 7.917 7.917-3.552 7.916-7.917 7.916m-.537-4.205q.267.038.537.039a3.755 3.755 0 0 0 3.75-3.75q0-.472-.116-.923zm.537-7.461a3.755 3.755 0 0 0-3.75 3.75q0 .47.117.922l4.17-4.634a4 4 0 0 0-.537-.038"
			opacity={0.05}
		/>
		<path
			fill="#000"
			d="M20.5 30.417c-4.135 0-7.5-3.364-7.5-7.5 0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5c0 4.136-3.365 7.5-7.5 7.5m-1.313-3.55q.638.216 1.313.216a4.17 4.17 0 0 0 4.167-4.166c0-.594-.13-1.18-.377-1.72zM20.5 18.75a4.17 4.17 0 0 0-4.167 4.167c0 .594.13 1.18.377 1.72l5.104-5.671a4.1 4.1 0 0 0-1.314-.216"
			opacity={0.07}
		/>
		<path
			fill="url(#PolicyBlockIP_svg__e)"
			d="M20.5 15.833a7.09 7.09 0 0 0-7.084 7.084A7.09 7.09 0 0 0 20.5 30a7.09 7.09 0 0 0 7.083-7.083 7.09 7.09 0 0 0-7.083-7.084m0 2.5c.724 0 1.407.174 2.017.474l-5.892 6.546a4.55 4.55 0 0 1-.709-2.436 4.59 4.59 0 0 1 4.584-4.584m0 9.167a4.54 4.54 0 0 1-2.017-.474l5.892-6.547c.446.707.708 1.54.708 2.437A4.59 4.59 0 0 1 20.5 27.5"
		/>
		<defs>
			<linearGradient
				id="PolicyBlockIP_svg__a"
				x1={4.345}
				x2={36.28}
				y1={6.451}
				y2={12.944}
				gradientUnits="userSpaceOnUse"
			>
				<stop stopColor="#0077D2" />
				<stop offset={1} stopColor="#0B59A2" />
			</linearGradient>
			<linearGradient
				id="PolicyBlockIP_svg__b"
				x1={13.834}
				x2={35.5}
				y1={9.583}
				y2={9.583}
				gradientUnits="userSpaceOnUse"
			>
				<stop stopColor="#7DD8F3" />
				<stop offset={1} stopColor="#45B0D0" />
			</linearGradient>
			<linearGradient
				id="PolicyBlockIP_svg__c"
				x1={6.126}
				x2={7.193}
				y1={8.68}
				y2={10.224}
				gradientUnits="userSpaceOnUse"
			>
				<stop stopColor="#75DAFF" />
				<stop offset={1} stopColor="#49BEF1" />
			</linearGradient>
			<linearGradient
				id="PolicyBlockIP_svg__d"
				x1={10.292}
				x2={11.36}
				y1={8.68}
				y2={10.224}
				gradientUnits="userSpaceOnUse"
			>
				<stop stopColor="#75DAFF" />
				<stop offset={1} stopColor="#49BEF1" />
			</linearGradient>
			<linearGradient
				id="PolicyBlockIP_svg__e"
				x1={14.878}
				x2={25.689}
				y1={13.347}
				y2={31.751}
				gradientUnits="userSpaceOnUse"
			>
				<stop stopColor="#F44F5A" />
				<stop offset={0.443} stopColor="#EE3D4A" />
				<stop offset={1} stopColor="#E52030" />
			</linearGradient>
		</defs>
	</svg>
);
const ForwardRef = forwardRef(SvgPolicyBlockIp);
const Memo = memo(ForwardRef);
export default Memo;
