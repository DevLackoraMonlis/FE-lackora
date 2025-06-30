import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgMtnLogstashWeb = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
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
			d="m15.421 9-.141 4.542h.191L16.921 9h1.634l-2.059 6h-2.5l.225-3.842L13.104 15h-2.5l.059-6h1.633l-.15 4.542h.192L13.796 9zM9.8 15H6l1.058-6h1.5l-.825 4.7h2.3z"
		/>
	</svg>
);
const ForwardRef = forwardRef(SvgMtnLogstashWeb);
const Memo = memo(ForwardRef);
export default Memo;
