import { type Ref, type SVGProps, forwardRef, memo } from "react";
const SvgPolicyQuarantineFile = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		fill="none"
		viewBox="0 0 41 40"
		ref={ref}
		{...props}
	>
		<g clipPath="url(#PolicyQuarantineFile_svg__a)">
			<path
				fill="#50E6FF"
				d="M3.834 31.667V12.5h33.333v19.167c0 .916-.75 1.666-1.667 1.666h-30c-.917 0-1.666-.75-1.666-1.666"
			/>
			<path
				fill="url(#PolicyQuarantineFile_svg__b)"
				d="M37.167 8.333V12.5H3.834V8.333c0-.916.75-1.666 1.666-1.666h30c.917 0 1.667.75 1.667 1.666"
			/>
			<path
				fill="url(#PolicyQuarantineFile_svg__c)"
				d="M6.75 10.833a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5"
			/>
			<path
				fill="#000"
				d="M35.77 23.662c-.839-.572-1.705-1.162-3.187-1.162s-2.347.59-3.185 1.162C28.433 24.32 27.434 25 25.084 25c-.69 0-1.25.56-1.25 1.25V30c0 .613.077 1.24.229 1.865.123.505.296.995.508 1.468h10.93c.916 0 1.666-.75 1.666-1.666V24.48c-.546-.238-.975-.53-1.398-.818"
				opacity={0.05}
			/>
			<path
				fill="#000"
				d="M35.535 24.006c-.822-.56-1.598-1.09-2.952-1.09s-2.13.53-2.951 1.09c-.97.662-2.07 1.41-4.549 1.41a.834.834 0 0 0-.833.834V30c0 .58.073 1.175.218 1.766.132.542.323 1.066.557 1.567H35.5c.917 0 1.667-.75 1.667-1.666v-6.738c-.667-.266-1.165-.605-1.632-.923"
				opacity={0.07}
			/>
			<path
				fill="url(#PolicyQuarantineFile_svg__d)"
				d="M10.917 10.833a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5"
			/>
			<path fill="#107C42" d="M32.583 40a.417.417 0 0 1 0-.833z" />
			<path fill="#185C37" d="M33 39.583c0 .23-.187.417-.416.417v-.833c.23 0 .416.186.416.416" />
			<path fill="#21A366" d="M40.083 26.667a.417.417 0 1 0 0-.834.417.417 0 0 0 0 .834" />
			<path fill="#33C481" d="M25.083 26.667a.417.417 0 1 0 0-.834.417.417 0 0 0 0 .834" />
			<path fill="#185C37" d="m32.584 39.583.178.378s6.31-3.292 7.533-8.294h-7.712z" />
			<path
				fill="#21A366"
				d="m40.5 26.25-.416-.417c-4.635 0-4.7-2.5-7.5-2.5v8.334h7.711c.131-.537.205-1.093.205-1.667z"
			/>
			<path fill="#107C42" d="m32.583 39.583-.178.378s-6.31-3.292-7.533-8.294h7.711z" />
			<path
				fill="#33C481"
				d="m24.667 26.25.416-.417c4.634 0 4.7-2.5 7.5-2.5v8.334h-7.71A7 7 0 0 1 24.665 30z"
			/>
		</g>
		<defs>
			<linearGradient
				id="PolicyQuarantineFile_svg__b"
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
				id="PolicyQuarantineFile_svg__c"
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
				id="PolicyQuarantineFile_svg__d"
				x1={10.292}
				x2={11.36}
				y1={8.68}
				y2={10.224}
				gradientUnits="userSpaceOnUse"
			>
				<stop stopColor="#75DAFF" />
				<stop offset={1} stopColor="#49BEF1" />
			</linearGradient>
			<clipPath id="PolicyQuarantineFile_svg__a">
				<path fill="#fff" d="M.5 0h40v40H.5z" />
			</clipPath>
		</defs>
	</svg>
);
const ForwardRef = forwardRef(SvgPolicyQuarantineFile);
const Memo = memo(ForwardRef);
export default Memo;
