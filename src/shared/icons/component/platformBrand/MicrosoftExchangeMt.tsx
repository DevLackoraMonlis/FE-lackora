import * as React from "react";
import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgMicrosoftExchangeMt = (
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
			fill="#28A8EA"
			d="M21.316 3h-4.578a1.3 1.3 0 0 0-.925.383L5.008 14.188a1.3 1.3 0 0 0-.383.925v4.578A1.31 1.31 0 0 0 5.934 21h4.577a1.3 1.3 0 0 0 .926-.383L22.242 9.812c.245-.246.383-.578.383-.926V4.31A1.31 1.31 0 0 0 21.316 3"
		/>
		<path
			fill="#0078D4"
			d="M21.316 21h-4.578c-.347 0-.68-.138-.925-.383l-2.188-2.189V14.34a2.34 2.34 0 0 1 2.34-2.34h4.089l2.188 2.188c.245.246.383.578.383.925v4.578A1.31 1.31 0 0 1 21.316 21"
		/>
		<path
			fill="#50D9FF"
			d="M5.934 3h4.577c.347 0 .68.138.926.383l2.188 2.188V9.66a2.34 2.34 0 0 1-2.34 2.34H7.196L5.008 9.812a1.3 1.3 0 0 1-.383-.926V4.31A1.31 1.31 0 0 1 5.934 3"
		/>
		<path
			fill="#000"
			d="M12.875 7.624V17.5q0 .076-.015.15a.87.87 0 0 1-.859.724H4.625V6.75H12a.87.87 0 0 1 .874.874"
			opacity={0.2}
		/>
		<path
			fill="#000"
			d="M13.25 7.624v9.127A1.26 1.26 0 0 1 12 18H4.625V6.375H12a1.253 1.253 0 0 1 1.249 1.249"
			opacity={0.1}
		/>
		<path
			fill="#000"
			d="M12.875 7.624v9.127a.873.873 0 0 1-.874.874H4.625V6.75H12a.87.87 0 0 1 .874.874"
			opacity={0.2}
		/>
		<path
			fill="#000"
			d="M12.5 7.624v9.127a.873.873 0 0 1-.874.874H4.625V6.75h7.001a.87.87 0 0 1 .874.874"
			opacity={0.1}
		/>
		<path
			fill="#0078D4"
			d="M11.625 6.75h-8.75A.875.875 0 0 0 2 7.625v8.75c0 .483.392.875.875.875h8.75a.875.875 0 0 0 .875-.875v-8.75a.875.875 0 0 0-.875-.875"
		/>
		<path
			fill="#fff"
			d="M8.97 10.08H6.513v1.436H8.82v.92H6.514v1.492H9.1v.916H5.4V9.156h3.57z"
		/>
	</svg>
);
const ForwardRef = forwardRef(SvgMicrosoftExchangeMt);
const Memo = memo(ForwardRef);
export default Memo;
