import { type Ref, type SVGProps, forwardRef, memo } from "react";
const SvgPolicyChatBubble = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
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
			fill="url(#PolicyChatBubble_svg__a)"
			d="M20.5 3.333C11.295 3.333 3.833 10.795 3.833 20c0 3.03.822 5.864 2.235 8.312l-3.803 8.654c-.422.959.592 1.916 1.526 1.441l8.128-4.139a16.56 16.56 0 0 0 8.58 2.399c9.206 0 16.668-7.462 16.668-16.667S29.705 3.333 20.5 3.333"
		/>
		<path
			fill="url(#PolicyChatBubble_svg__b)"
			d="M20.5 22.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"
			opacity={0.3}
		/>
		<path fill="#fff" d="M20.5 21.667a1.667 1.667 0 1 0 0-3.334 1.667 1.667 0 0 0 0 3.334" />
		<path
			fill="url(#PolicyChatBubble_svg__c)"
			d="M13.834 22.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"
			opacity={0.3}
		/>
		<path fill="#fff" d="M13.833 21.667a1.667 1.667 0 1 0 0-3.334 1.667 1.667 0 0 0 0 3.334" />
		<path
			fill="url(#PolicyChatBubble_svg__d)"
			d="M27.167 22.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"
			opacity={0.3}
		/>
		<path fill="#fff" d="M27.167 21.667a1.667 1.667 0 1 0 0-3.334 1.667 1.667 0 0 0 0 3.334" />
		<defs>
			<radialGradient
				id="PolicyChatBubble_svg__b"
				cx={0}
				cy={0}
				r={1}
				gradientTransform="matrix(2.5 0 0 2.5 20.5 20)"
				gradientUnits="userSpaceOnUse"
			>
				<stop />
				<stop offset={1} stopOpacity={0} />
			</radialGradient>
			<radialGradient
				id="PolicyChatBubble_svg__c"
				cx={0}
				cy={0}
				r={1}
				gradientTransform="matrix(2.5 0 0 2.5 13.834 20)"
				gradientUnits="userSpaceOnUse"
			>
				<stop />
				<stop offset={1} stopOpacity={0} />
			</radialGradient>
			<radialGradient
				id="PolicyChatBubble_svg__d"
				cx={0}
				cy={0}
				r={1}
				gradientTransform="matrix(2.5 0 0 2.5 27.166 20)"
				gradientUnits="userSpaceOnUse"
			>
				<stop />
				<stop offset={1} stopOpacity={0} />
			</radialGradient>
			<linearGradient
				id="PolicyChatBubble_svg__a"
				x1={29.002}
				x2={8.791}
				y1={5.662}
				y2={39.748}
				gradientUnits="userSpaceOnUse"
			>
				<stop stopColor="#0176D0" />
				<stop offset={1} stopColor="#16538C" />
			</linearGradient>
		</defs>
	</svg>
);
const ForwardRef = forwardRef(SvgPolicyChatBubble);
const Memo = memo(ForwardRef);
export default Memo;
