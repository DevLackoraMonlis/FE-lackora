import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgMtNwebcare = (
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
			d="M15.138 15.098q-1.002 0-1.386-.434-.267-.307-.266-.861 0-.238.049-.511l.287-1.61q.315-1.77 2.275-1.771.812 0 1.232.35.42.343.42.945 0 .28-.084.56a2 2 0 0 1-.154.406l-.077.14h-1.24q.232-.266.232-.756 0-.26-.133-.406-.134-.154-.392-.154-.706 0-.84.784l-.245 1.414a2 2 0 0 0-.035.357q0 .462.553.462.665 0 .798-.749h1.26l-.035.203q-.28 1.63-2.22 1.631M10.938 9.96l-.12 3.815h.162l1.218-3.815h1.372L11.84 15h-2.1l.19-3.227L8.992 15h-2.1l.049-5.04h1.372l-.126 3.815h.16L9.574 9.96z"
		/>
	</svg>
);
const ForwardRef = forwardRef(SvgMtNwebcare);
const Memo = memo(ForwardRef);
export default Memo;
