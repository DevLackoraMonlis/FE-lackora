import type { SVGProps } from "react";
import { type Ref, forwardRef, memo } from "react";
const SvgOpenport1 = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
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
			fill="#041E42"
			d="M3.983 1.944c.164-.025.33-.026.497-.024h15.2a2.399 2.399 0 0 1 2.4 2.369v15.39a2.4 2.4 0 0 1-.551 1.53 2.41 2.41 0 0 1-1.946.871H4.607c-.213-.001-.427.008-.638-.026a2.405 2.405 0 0 1-2.05-2.372V4.319a2.4 2.4 0 0 1 .552-1.527 2.4 2.4 0 0 1 1.512-.848M5.76 6.72v7.68h1.92v1.44H9.6v1.44h4.8v-1.44h1.92V14.4h1.92V6.72z"
		/>
		<path
			fill="#0530AD"
			d="M7.2 8.16h.96v3.36H7.2zM8.64 8.16h.96v3.36h-.96zM10.08 8.16h.96v3.36h-.96zM11.52 8.16h.96v3.36h-.96zM12.96 8.16h.96v3.36h-.96zM14.4 8.16h.96v3.36h-.96zM15.84 8.16h.96v3.36h-.96z"
		/>
	</svg>
);
const ForwardRef = forwardRef(SvgOpenport1);
const Memo = memo(ForwardRef);
export default Memo;
