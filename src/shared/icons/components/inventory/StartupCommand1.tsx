import type { SVGProps } from "react";
import { type Ref, forwardRef, memo } from "react";
const SvgStartupCommand1 = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		fill="none"
		viewBox="0 0 24 24"
		ref={ref}
		{...props}
	>
		<path
			fill="#041E42"
			d="M3.827 4.024q.15-.022.3-.024h15.714a2.15 2.15 0 0 1 2.133 1.818c.035.203.025.409.026.613v10.88c-.003.27.015.542-.043.807a2.15 2.15 0 0 1-2.085 1.723H4.13a2.148 2.148 0 0 1-2.113-1.889c-.02-.148-.016-.298-.016-.448V6.143c0-.557.227-1.111.623-1.504.32-.329.75-.546 1.204-.615m2.457 4.198a.72.72 0 0 0 .202.65q1.51 1.511 3.022 3.021-1.54 1.541-3.08 3.08a.716.716 0 1 0 1.031.999q1.794-1.792 3.585-3.585a.72.72 0 0 0-.008-.99Q9.26 9.618 7.483 7.843a.716.716 0 0 0-1.199.378m6.208 7.32a.72.72 0 0 0-.36 1.095c.134.194.37.309.605.303h4.093c.13-.001.264.008.39-.03a.72.72 0 0 0 .369-1.122.72.72 0 0 0-.565-.282h-4.13c-.134 0-.273-.01-.402.035"
		/>
	</svg>
);
const ForwardRef = forwardRef(SvgStartupCommand1);
const Memo = memo(ForwardRef);
export default Memo;
