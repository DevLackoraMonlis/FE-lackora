import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgJm = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 12 6"
		width="1em"
		height="1em"
		ref={ref}
		{...props}
	>
		<defs>
			<clipPath id="jm_svg__a">
				<path d="M0 0h12v6H0z" />
			</clipPath>
		</defs>
		<path fill="#007749" d="M0 0h12v6H0z" />
		<path
			fill="#2d2926"
			stroke="#ffb81c"
			d="M-2-1v8l16-8v8z"
			clipPath="url(#jm_svg__a)"
		/>
	</svg>
);
const ForwardRef = forwardRef(SvgJm);
const Memo = memo(ForwardRef);
export default Memo;
