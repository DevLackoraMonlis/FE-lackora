import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgJo = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 840 420"
		width="1em"
		height="1em"
		ref={ref}
		{...props}
	>
		<path fill="#007a3d" d="M0 0h840v420H0z" />
		<path fill="#fff" d="M0 0h840v280H0z" />
		<path d="M0 0h840v140H0z" />
		<path fill="#ce1126" d="M0 0v420l420-210z" />
		<path
			fill="#fff"
			d="m129.787 180 6.508 16.485 16.947-5.19-8.83 15.367 14.623 10.014-17.52 2.676 1.289 17.677L129.787 225l-13.016 12.03 1.289-17.678-17.52-2.676 14.623-10.014-8.83-15.367 16.946 5.19L129.787 180z"
		/>
	</svg>
);
const ForwardRef = forwardRef(SvgJo);
const Memo = memo(ForwardRef);
export default Memo;
