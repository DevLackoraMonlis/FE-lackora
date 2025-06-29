import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgOracleOracleFgAxml = (
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
			fill="red"
			fillRule="evenodd"
			d="M7.957 18.912A6.953 6.953 0 0 1 1 11.962 6.963 6.963 0 0 1 7.957 5h8.087A6.96 6.96 0 0 1 23 11.962a6.95 6.95 0 0 1-6.956 6.95zm7.907-2.453a4.497 4.497 0 0 0 4.503-4.497 4.507 4.507 0 0 0-4.503-4.508H8.136a4.507 4.507 0 0 0-4.503 4.508 4.5 4.5 0 0 0 4.503 4.497z"
			clipRule="evenodd"
		/>
	</svg>
);
const ForwardRef = forwardRef(SvgOracleOracleFgAxml);
const Memo = memo(ForwardRef);
export default Memo;
