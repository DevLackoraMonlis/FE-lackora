import * as React from "react";
import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgMtntiamo = (
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
			d="M18.669 10.365q1.205 0 1.205.985 0 .165-.035.355l-.175 1q-.12.695-.52 1.03t-1.125.335-1.01-.335q-.195-.23-.195-.635 0-.18.04-.395l.175-1q.235-1.34 1.64-1.34m-.515 2.93a.6.6 0 0 0 .4-.13q.15-.13.21-.48l.17-.96q.015-.1.015-.18 0-.405-.41-.405-.515.01-.615.585l-.17.96q-.02.125-.02.26 0 .35.42.35M14.017 10.4l.535 1.725 1.15-1.725h.945l-.635 3.6h-.905l.36-2.03-.77 1.21h-.655l-.34-1.21-.36 2.03h-.9l.635-3.6zM11.019 14l.03-.785h-.835L9.969 14h-.955l1.285-3.6h1.65l.02 3.6zm-.206-2.725-.394 1.27h.655l.055-1.27zM9.162 10.4l-.63 3.6h-.905l.635-3.6zM7.71 11.18H6.48L5.987 14H5.08l.495-2.82H4.34l.14-.78h3.37z"
		/>
	</svg>
);
const ForwardRef = forwardRef(SvgMtntiamo);
const Memo = memo(ForwardRef);
export default Memo;
