import type { SVGProps } from "react";
import { type Ref, forwardRef, memo } from "react";
const SvgFortiSandbox = (
	props: SVGProps<SVGSVGElement>,
	ref: Ref<SVGSVGElement>,
) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		fill="none"
		viewBox="0 0 241 240"
		ref={ref}
		{...props}
	>
		<path
			fill="#EE3124"
			d="M20.294 102.981h56.58v37.12h-56.58zM92.51 50.225h55.568v37.12H92.51zm0 105.287h55.568v37.12H92.51zm71.091-52.531h56.805v37.12h-56.805zM43.578 50.225c-11.81 3.037-21.034 16.198-23.284 33.07v4.163h56.58V50.225zM20.294 155.512v4.612c2.025 16.085 10.686 28.909 21.822 32.508h34.87v-37.12zm200-68.167v-4.162c-2.25-16.648-11.474-29.92-23.285-33.07h-33.52v37.12h56.805zm-21.822 105.512c11.023-3.824 19.685-16.423 21.822-32.508v-4.612h-56.805v37.12z"
		/>
	</svg>
);
const ForwardRef = forwardRef(SvgFortiSandbox);
const Memo = memo(ForwardRef);
export default Memo;
