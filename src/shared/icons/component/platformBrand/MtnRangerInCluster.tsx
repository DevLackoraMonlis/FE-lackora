import type { SVGProps } from "react";
import { type Ref, forwardRef, memo } from "react";
const SvgMtnRangerInCluster = (
	props: SVGProps<SVGSVGElement>,
	ref: Ref<SVGSVGElement>,
) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		fill="none"
		viewBox="0 0 241 240"
		ref={ref}
		{...props}
	>
		<path fill="#FFBE00" d="M20 20h200v200H20z" />
		<path
			fill="#005C87"
			d="M120.001 181.652c53.181 0 96.293-26.372 96.293-58.903s-43.112-58.904-96.293-58.904-96.294 26.372-96.294 58.904c0 32.531 43.112 58.903 96.294 58.903"
		/>
		<path
			fill="#fff"
			d="M69.446 99.6q7.98 0 11.34 3.5 2.52 2.66 2.52 6.72 0 1.4-.28 2.94l-.98 5.46q-.84 4.55-2.94 7.35-2.03 2.8-4.55 3.99l6.37 20.44h-14.14l-5.88-18.83h-4.34L53.696 150h-13.44l8.89-50.4zm-4.41 10.92h-5.25l-1.82 12.18h4.9q3.71 0 5.32-1.75 1.61-1.82 1.61-4.76 0-5.67-4.76-5.67M111.113 150l.42-10.99h-11.69L96.413 150h-13.37l17.99-50.4h23.1l.28 50.4zm-2.87-38.15-5.53 17.78h9.17l.77-17.78zM152.527 99.6l-8.82 50.4h-12.67l8.89-50.4zM201.336 99.6l-8.82 50.4h-12.67l-8.82-27.58-4.76 27.58h-12.67l8.89-50.4h13.02l8.68 25.76 4.55-25.76z"
		/>
	</svg>
);
const ForwardRef = forwardRef(SvgMtnRangerInCluster);
const Memo = memo(ForwardRef);
export default Memo;
