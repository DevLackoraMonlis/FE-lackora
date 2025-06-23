import * as React from "react";
import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgJira = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		fill="none"
		viewBox="0 0 24 24"
		ref={ref}
		{...props}
	>
		<g clipPath="url(#Jira_svg__a)">
			<path fill="#EBECF0" d="M22 2H2v20h20z" />
			<path
				fill="#2684FF"
				d="M16.825 6.775h-5.05A2.283 2.283 0 0 0 14.05 9.05h.925v.9a2.283 2.283 0 0 0 2.275 2.275V7.2a.42.42 0 0 0-.425-.425"
			/>
			<path
				fill="url(#Jira_svg__b)"
				d="M14.325 9.275h-5.05a2.283 2.283 0 0 0 2.275 2.275h.925v.9a2.283 2.283 0 0 0 2.275 2.275v-5c0-.25-.2-.45-.425-.45"
			/>
			<path
				fill="url(#Jira_svg__c)"
				d="M11.825 11.8H6.75a2.283 2.283 0 0 0 2.275 2.275h.925v.9a2.283 2.283 0 0 0 2.275 2.275v-5a.41.41 0 0 0-.4-.45"
			/>
		</g>
		<defs>
			<linearGradient
				id="Jira_svg__b"
				x1={14.651}
				x2={12.501}
				y1={9.294}
				y2={11.512}
				gradientUnits="userSpaceOnUse"
			>
				<stop offset={0.176} stopColor="#0052CC" />
				<stop offset={1} stopColor="#2684FF" />
			</linearGradient>
			<linearGradient
				id="Jira_svg__c"
				x1={12.292}
				x2={9.805}
				y1={11.828}
				y2={14.248}
				gradientUnits="userSpaceOnUse"
			>
				<stop offset={0.176} stopColor="#0052CC" />
				<stop offset={1} stopColor="#2684FF" />
			</linearGradient>
			<clipPath id="Jira_svg__a">
				<path fill="#fff" d="M2 2h20v20H2z" />
			</clipPath>
		</defs>
	</svg>
);
const ForwardRef = forwardRef(SvgJira);
const Memo = memo(ForwardRef);
export default Memo;
