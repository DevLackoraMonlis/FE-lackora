import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgSs = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 20 10"
		width="1em"
		height="1em"
		ref={ref}
		{...props}
	>
		<path fill="#078930" d="M0 0h20v10H0z" />
		<path fill="#fff" d="M0 0h20v7H0z" />
		<path d="M0 0h20v3H0z" />
		<path fill="#da121a" d="M0 3.5h20v3H0z" />
		<path fill="#0f47af" d="m0 0 8.66 5L0 10z" />
		<path fill="#fcdd09" d="m1.22 5 3.015.98-1.863-2.565v3.17L4.235 4.02z" />
	</svg>
);
const ForwardRef = forwardRef(SvgSs);
const Memo = memo(ForwardRef);
export default Memo;
