import type { SVGProps } from "react";
import { type Ref, forwardRef, memo } from "react";
const SvgInstalledApplications1 = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
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
			d="M2.695 3.03c.116-.023.235-.03.353-.03 6 .002 12-.002 17.999.001.766.006 1.445.685 1.451 1.45.004 5.25 0 10.501.002 15.751a.76.76 0 0 1-.44.73c-.183.09-.392.065-.588.068H2.249c-.4.01-.76-.351-.749-.751V4.498c-.012-.691.518-1.337 1.195-1.467M3 7.5v12h18v-12z"
		/>
		<path
			fill="#0530AD"
			d="M6 9h12v4.5H6zm.75.75v3h10.5v-3zM6.616 15.012c.138-.02.278-.012.416-.013q1.735.001 3.47.002c.4-.012.76.35.747.75q.003.75 0 1.501a.75.75 0 0 1-.748.747H6.748A.75.75 0 0 1 6 17.252q-.002-.75 0-1.501a.75.75 0 0 1 .615-.74M13.364 15.012c.154-.02.31-.011.466-.012h3.185c.171.002.35-.017.512.053a.75.75 0 0 1 .472.692c0 .518.005 1.036-.002 1.553a.75.75 0 0 1-.747.7q-1.877.004-3.755 0a.75.75 0 0 1-.742-.7c-.009-.454 0-.909-.004-1.363.001-.155-.01-.316.054-.461a.75.75 0 0 1 .56-.462"
		/>
	</svg>
);
const ForwardRef = forwardRef(SvgInstalledApplications1);
const Memo = memo(ForwardRef);
export default Memo;
