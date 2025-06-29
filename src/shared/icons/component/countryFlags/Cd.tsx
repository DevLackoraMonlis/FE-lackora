import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgCd = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="1em" height="1em" ref={ref} {...props}>
		<path fill="#007fff" d="M0 0h800v600H0z" />
		<path
			fill="#f7d618"
			d="M36 120h84l26-84 26 84h84l-68 52 26 84-68-52-68 52 26-84-68-52zM750 0 0 450v150h50l750-450V0h-50"
		/>
		<path fill="#ce1021" d="M800 0 0 480v120l800-480V0" />
	</svg>
);
const ForwardRef = forwardRef(SvgCd);
const Memo = memo(ForwardRef);
export default Memo;
