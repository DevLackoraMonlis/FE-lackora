import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgMtnclm = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		fill="none"
		viewBox="0 0 24 24"
		ref={ref}
		{...props}
	>
		<path fill="#FFBE00" d="M2 2h20v20H2z" />
		<path
			fill="#005C87"
			d="M12 18.165c5.318 0 9.63-2.637 9.63-5.89s-4.312-5.89-9.63-5.89-9.63 2.637-9.63 5.89 4.312 5.89 9.63 5.89"
		/>
		<path
			fill="#fff"
			d="m14.63 10.046.696 2.242 1.495-2.242h1.228l-.825 4.68h-1.177l.468-2.64-1 1.573h-.852l-.442-1.573-.468 2.64h-1.17l.825-4.68zM12.062 14.726H9.098l.826-4.68h1.17l-.644 3.665h1.794zM6.534 14.817q-.93 0-1.287-.403-.247-.287-.247-.8 0-.221.045-.475l.267-1.494Q5.605 10 7.425 10q.753 0 1.144.325.39.318.39.878 0 .26-.079.52a1.7 1.7 0 0 1-.143.377l-.071.13h-1.15q.214-.248.214-.703a.54.54 0 0 0-.124-.377q-.123-.143-.364-.143-.655 0-.78.729l-.227 1.313a2 2 0 0 0-.033.331q0 .429.514.429.618 0 .741-.695h1.17l-.033.188q-.26 1.515-2.06 1.515"
		/>
	</svg>
);
const ForwardRef = forwardRef(SvgMtnclm);
const Memo = memo(ForwardRef);
export default Memo;
