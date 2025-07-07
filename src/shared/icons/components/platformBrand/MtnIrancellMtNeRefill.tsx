import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgMtnIrancellMtNeRefill = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		fill="none"
		viewBox="0 0 24 24"
		ref={ref}
		{...props}
	>
		<g clipPath="url(#MTN_Irancell-MTNeRefill_svg__a)">
			<path fill="#FFBE00" d="M2 2h20v20H2z" />
			<path
				fill="#005C87"
				d="M12 18.165c5.318 0 9.63-2.637 9.63-5.89s-4.312-5.89-9.63-5.89-9.63 2.637-9.63 5.89 4.312 5.89 9.63 5.89"
			/>
			<path
				fill="#fff"
				d="M14.802 9q.798 0 1.134.35a.94.94 0 0 1 .252.672q0 .14-.028.294l-.098.546q-.084.455-.294.735-.203.28-.455.399l.637 2.044h-1.414l-.588-1.883h-.434l-.287 1.883h-1.344l.89-5.04zm-.44 1.092h-.526l-.182 1.218h.49q.372 0 .532-.175a.7.7 0 0 0 .161-.476q0-.567-.476-.567M9.456 14.138Q8 14.138 8 13.13q0-.14.028-.301l.147-.868q.12-.672.616-1.029.505-.364 1.33-.364 1.407 0 1.407 1.064 0 .155-.028.336l-.084.497H9.281l-.028.161a1 1 0 0 0-.014.154q0 .385.455.385a.42.42 0 0 0 .287-.105.4.4 0 0 0 .14-.245l1.162.014q-.231 1.31-1.827 1.309m.84-2.1a1 1 0 0 0 .028-.217q0-.105-.091-.21-.09-.105-.294-.105a.57.57 0 0 0-.364.133.7.7 0 0 0-.224.399z"
			/>
		</g>
		<defs>
			<clipPath id="MTN_Irancell-MTNeRefill_svg__a">
				<path fill="#fff" d="M2 2h20v20H2z" />
			</clipPath>
		</defs>
	</svg>
);
const ForwardRef = forwardRef(SvgMtnIrancellMtNeRefill);
const Memo = memo(ForwardRef);
export default Memo;
