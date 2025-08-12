import type { SVGProps } from "react";
import { type Ref, forwardRef, memo } from "react";
const SvgIp4RouteTable = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
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
			d="M2.5 8.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7A.5.5 0 0 0 7 8H3a.5.5 0 0 0-.5.5"
		/>
		<path
			fill="#0530AD"
			d="M16 9.5v5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-5a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 0-.5.5M16 1.5v5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-5a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 0-.5.5M16 17.5v5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-5a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 0-.5.5"
		/>
		<path fill="#6D6E71" d="M16 11.5H7.5v1H16z" />
		<path
			fill="#6D6E71"
			d="M16 3.5v1h-4a.5.5 0 0 0-.5.5v14a.5.5 0 0 0 .5.5h4v1h-4c-.827 0-1.5-.673-1.5-1.5V5c0-.827.673-1.5 1.5-1.5z"
		/>
	</svg>
);
const ForwardRef = forwardRef(SvgIp4RouteTable);
const Memo = memo(ForwardRef);
export default Memo;
