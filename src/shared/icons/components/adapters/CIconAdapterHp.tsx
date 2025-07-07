import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgCIconAdapterHp = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		fill="none"
		viewBox="0 0 32 32"
		ref={ref}
		{...props}
	>
		<path
			fill="#024AD8"
			d="m16.045 0-3.443 9.652h2.34c1.686.001 2.403 1.33 1.872 2.819l-3.423 9.597H9.947l3.766-10.56H11.94l-3.766 10.56H4.699L12.427.4C5.31 2.024 0 8.391 0 16c0 7.49 5.146 13.776 12.095 15.52l7.807-21.922h5.654c1.17 0 2.64.789 2.005 2.583l-3.174 8.964c-.406 1.145-1.37 1.377-2.138 1.377h-3.476l-3.37 9.466q.297.011.597.012c8.836 0 16-7.163 16-16C32 7.178 24.86.024 16.044 0m6.66 11.482-3.279 9.205h1.746l3.28-9.205z"
		/>
	</svg>
);
const ForwardRef = forwardRef(SvgCIconAdapterHp);
const Memo = memo(ForwardRef);
export default Memo;
