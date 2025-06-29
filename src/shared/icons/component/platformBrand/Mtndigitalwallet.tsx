import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgMtndigitalwallet = (
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
		<path fill="#FFBE00" d="M2 2h20v20H2z" />
		<path
			fill="#005C87"
			d="M12 18.165c5.318 0 9.63-2.637 9.63-5.89s-4.312-5.89-9.63-5.89-9.63 2.637-9.63 5.89 4.312 5.89 9.63 5.89"
		/>
		<path
			fill="#fff"
			d="m17.384 10.32-.11 3.543h.149l1.13-3.543h1.275L18.222 15h-1.95l.176-2.996L15.577 15h-1.95l.045-4.68h1.274l-.117 3.543h.15l1.137-3.543zM10.588 15.091q-.923 0-1.274-.429-.24-.3-.241-.819 0-.24.052-.527l.227-1.3q.306-1.741 2.133-1.742.753 0 1.144.326.39.318.39.877 0 .228-.066.461a2 2 0 0 1-.117.351l-.065.117h-1.15a.9.9 0 0 0 .169-.539q0-.585-.487-.585-.657 0-.787.76l-.221 1.249a2 2 0 0 0-.033.344q0 .449.527.449.533 0 .683-.534h-.534l.13-.721h1.723l-.104.559-.032.188q-.273 1.515-2.067 1.515M7.253 10.32q.852 0 1.216.429.267.325.266.813 0 .175-.032.37l-.254 1.45q-.13.734-.637 1.176T6.5 15H4.608l.825-4.68zm-.41 1.014h-.422l-.461 2.652h.617q.306 0 .475-.163.175-.168.24-.546l.189-1.065q.026-.144.026-.26 0-.618-.663-.618"
		/>
	</svg>
);
const ForwardRef = forwardRef(SvgMtndigitalwallet);
const Memo = memo(ForwardRef);
export default Memo;
