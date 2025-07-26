import type { SVGProps } from "react";
import { type Ref, forwardRef, memo } from "react";

const SvgAssetProfiling = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		fill="none"
		viewBox="0 0 22 25"
		ref={ref}
		{...props}
	>
		<path
			fill="#fff"
			fillRule="evenodd"
			d="M4.334 2.972A1.333 1.333 0 0 0 3 4.306v4a1.333 1.333 0 0 0 1.334 1.333h3.448c.707 0 1.385.281 1.885.781L11 11.753l1.333-1.333c.5-.5 1.178-.78 1.886-.781h3.448A1.333 1.333 0 0 0 19 8.306v-4a1.333 1.333 0 0 0-1.333-1.334zM1.504 1.477A4 4 0 0 1 4.334.306h13.333a4 4 0 0 1 4 4v4a4 4 0 0 1-4 4h-3.448l-2.276 2.276c-.52.52-1.365.52-1.886 0l-2.276-2.276H4.334a4 4 0 0 1-4-4v-4a4 4 0 0 1 1.171-2.829M7 20.306a4 4 0 1 1 8 0 4 4 0 0 1-8 0m4-1.334a1.333 1.333 0 1 0 0 2.667 1.333 1.333 0 0 0 0-2.667"
			clipRule="evenodd"
		/>
	</svg>
);
const ForwardRef = forwardRef(SvgAssetProfiling);
const Memo = memo(ForwardRef);
export default Memo;
