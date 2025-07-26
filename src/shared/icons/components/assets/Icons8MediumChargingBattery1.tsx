import type { SVGProps } from "react";
import { type Ref, forwardRef, memo } from "react";
const SvgIcons8MediumChargingBattery1 = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		fill="none"
		viewBox="0 0 16 16"
		ref={ref}
		{...props}
	>
		<path fill="#424242" d="M12 14.667H4V2h8z" />
		<path fill="#424242" d="M9.667 4.333H6.333v-3h3.334z" />
		<path fill="#29B6F6" d="M12 14.667H4V8h8z" />
		<path fill="#FAFAFA" d="M10 8H8.167L8.9 4.333 6 8.667h1.833L7.1 12.333z" />
	</svg>
);
const ForwardRef = forwardRef(SvgIcons8MediumChargingBattery1);
const Memo = memo(ForwardRef);
export default Memo;
