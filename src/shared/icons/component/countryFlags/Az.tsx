import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgAz = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 1200 600"
		width="1em"
		height="1em"
		ref={ref}
		{...props}
	>
		<path fill="#3f9c35" d="M0 0h1200v600H0z" />
		<path fill="#ed2939" d="M0 0h1200v400H0z" />
		<path fill="#00b9e4" d="M0 0h1200v200H0z" />
		<circle cx={580} cy={300} r={90} fill="#fff" />
		<circle cx={600} cy={300} r={75} fill="#ed2939" />
		<path
			fill="#fff"
			d="m680 250 9.567 26.903 25.788-12.258-12.258 25.788L730 300l-26.903 9.567 12.258 25.788-25.788-12.258L680 350l-9.567-26.903-25.788 12.258 12.258-25.788L630 300l26.903-9.567-12.258-25.788 25.788 12.258L680 250z"
		/>
	</svg>
);
const ForwardRef = forwardRef(SvgAz);
const Memo = memo(ForwardRef);
export default Memo;
