import * as React from "react";
import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgMtncp = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
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
			d="M14.352 13.577h-.773L13.325 15h-1.17l.826-4.68h1.982q.735 0 1.047.338.227.26.227.663 0 .136-.026.286l-.13.735q-.097.54-.572.89-.474.345-1.157.345m.202-2.243h-.585l-.215 1.229h.579q.532 0 .617-.475l.046-.266a.8.8 0 0 0 .013-.156q0-.099-.098-.215-.097-.117-.357-.117M9.591 15.091q-.93 0-1.287-.403-.247-.285-.247-.8 0-.22.046-.474l.266-1.495q.293-1.645 2.113-1.645.754 0 1.144.326.39.318.39.877 0 .26-.078.52a1.7 1.7 0 0 1-.143.377l-.072.13h-1.15q.214-.247.214-.702a.54.54 0 0 0-.123-.377q-.124-.143-.364-.143-.657 0-.78.728l-.228 1.313a2 2 0 0 0-.032.332q0 .429.513.429.618 0 .741-.696h1.17l-.032.188q-.26 1.515-2.06 1.515"
		/>
	</svg>
);
const ForwardRef = forwardRef(SvgMtncp);
const Memo = memo(ForwardRef);
export default Memo;
