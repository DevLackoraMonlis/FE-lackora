import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgMikrotikMikrotikRouterOs = (
	props: SVGProps<SVGSVGElement>,
	ref: Ref<SVGSVGElement>,
) => (
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
			fill="#283238"
			fillRule="evenodd"
			d="M11.849 2.017a3.15 3.15 0 0 1 1.66.276l7.426 4.109q.617.418.75 1.145.08 4.464 0 8.928a2.05 2.05 0 0 1-.987 1.304q-3.535 1.905-7.032 3.871-1.403.737-2.765-.079a433 433 0 0 0-6.874-3.792 1.67 1.67 0 0 1-.988-1.225 261 261 0 0 1 0-9.086q.083-.489.435-.83l.948-.631a515 515 0 0 1 7.427-3.99m.237 3.792q.652-.03 1.185.356l4.583 2.528q.222.183.355.434a56 56 0 0 1-.079 5.926 7.5 7.5 0 0 1-1.58.948.3.3 0 0 1-.158-.079l-.08-4.977a.47.47 0 0 0-.434-.04q-1.048.623-2.133 1.185a1.4 1.4 0 0 0-.355.435l-.08 5.056a.56.56 0 0 1-.197.356q-.986.644-1.699-.277a91 91 0 0 0-.158-5.293l-.276-.277q-2.227-1.18-4.425-2.41-.235-.616.316-.987a2.9 2.9 0 0 1 .909-.435 65 65 0 0 1 4.227 2.252q.446.087.869-.079l1.58-.869q.354-.26.08-.553a94 94 0 0 1-3.912-2.173q-.06-.177.119-.276zm-5.53 5.057q.78.31 1.5.75.178.099.277.277a35 35 0 0 1-.04 4.069.34.34 0 0 1-.315 0L6.87 15.33a1.4 1.4 0 0 1-.355-.435 35 35 0 0 1 .04-4.03"
			clipRule="evenodd"
			opacity={0.976}
		/>
	</svg>
);
const ForwardRef = forwardRef(SvgMikrotikMikrotikRouterOs);
const Memo = memo(ForwardRef);
export default Memo;
