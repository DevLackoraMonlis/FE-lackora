import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgMtnLogstashApp = (
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
			d="m14.393 15 .05-1.308h-1.412L12.616 15H11l2.174-6h2.792L16 15zm-.347-4.542-.669 2.117h1.109l.093-2.117zM10.769 15H7l1.05-6h1.487l-.818 4.7H11z"
		/>
	</svg>
);
const ForwardRef = forwardRef(SvgMtnLogstashApp);
const Memo = memo(ForwardRef);
export default Memo;
