import { type Ref, type SVGProps, forwardRef, memo } from "react";
const SvgPolicyTickets = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		fill="none"
		viewBox="0 0 41 40"
		ref={ref}
		{...props}
	>
		<path fill="url(#PolicyTickets_svg__a)" d="M33 9.167h-5.834v19.166H33z" />
		<path
			fill="url(#PolicyTickets_svg__b)"
			d="M37.167 16.686v-7.52c0-.92-.746-1.666-1.667-1.666h-30c-.92 0-1.666.746-1.666 1.667v7.519A4.14 4.14 0 0 1 5.5 20c0 1.358-.66 2.554-1.666 3.314v7.52c0 .92.745 1.666 1.666 1.666h30c.921 0 1.667-.746 1.667-1.667v-7.519A4.15 4.15 0 0 1 35.5 20c0-1.358.66-2.554 1.667-3.314m-7.5 14.147a.834.834 0 1 1 0-1.667.834.834 0 0 1 0 1.667m0-3.333a.834.834 0 1 1 0-1.667.834.834 0 0 1 0 1.667m0-3.333a.834.834 0 1 1 0-1.668.834.834 0 0 1 0 1.668m0-3.334a.834.834 0 1 1 0-1.667.834.834 0 0 1 0 1.667m0-3.333a.834.834 0 1 1 0-1.667.834.834 0 0 1 0 1.667m0-3.333a.834.834 0 1 1 0-1.668.834.834 0 0 1 0 1.668m0-3.334a.834.834 0 1 1 0-1.667.834.834 0 0 1 0 1.667"
		/>
		<path
			fill="url(#PolicyTickets_svg__c)"
			d="m36.017 7.5-.706-3.552a1.667 1.667 0 0 0-1.96-1.31L8.897 7.5zm-8.063-2.09a.834.834 0 1 1 .325 1.636.834.834 0 0 1-.325-1.635"
		/>
		<defs>
			<linearGradient
				id="PolicyTickets_svg__a"
				x1={28.477}
				x2={31.659}
				y1={9.341}
				y2={27.975}
				gradientUnits="userSpaceOnUse"
			>
				<stop stopColor="#D69400" />
				<stop offset={0.057} stopColor="#D49200" />
				<stop offset={0.554} stopColor="#C78600" />
				<stop offset={1} stopColor="#C28200" />
			</linearGradient>
			<linearGradient
				id="PolicyTickets_svg__b"
				x1={11.072}
				x2={30.15}
				y1={4.66}
				y2={35.701}
				gradientUnits="userSpaceOnUse"
			>
				<stop stopColor="#FFD869" />
				<stop offset={1} stopColor="#FEC52B" />
			</linearGradient>
			<linearGradient
				id="PolicyTickets_svg__c"
				x1={21.979}
				x2={24.957}
				y1={3.652}
				y2={27.624}
				gradientUnits="userSpaceOnUse"
			>
				<stop stopColor="#D69400" />
				<stop offset={0.057} stopColor="#D49200" />
				<stop offset={0.554} stopColor="#C78600" />
				<stop offset={1} stopColor="#C28200" />
			</linearGradient>
		</defs>
	</svg>
);
const ForwardRef = forwardRef(SvgPolicyTickets);
const Memo = memo(ForwardRef);
export default Memo;
