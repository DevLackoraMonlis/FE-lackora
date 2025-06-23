import * as React from "react";
import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgNginNginx = (
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
			fill="#019639"
			d="M11.961 1.5h.049q.375.179.729.396l8.143 4.685a.59.59 0 0 1 .31.59c-.005 3.292 0 6.583-.003 9.874a.6.6 0 0 1-.267.38q-4.33 2.493-8.66 4.983a.44.44 0 0 1-.493.027q-4.335-2.484-8.662-4.98a.53.53 0 0 1-.3-.499V7.084a.52.52 0 0 1 .29-.503q4.068-2.339 8.134-4.68c.241-.138.478-.284.73-.401"
		/>
		<path
			fill="#fff"
			d="M6.575 7.904v8.144a1.13 1.13 0 0 0 .32.815 1.235 1.235 0 0 0 1.546.154 1.17 1.17 0 0 0 .513-.97c0-1.964-.004-3.93 0-5.894q2.688 3.217 5.386 6.426a2.12 2.12 0 0 0 1.95.586 1.17 1.17 0 0 0 .938-1.028q.006-4.155 0-8.31a1.187 1.187 0 0 0-2.364 0c0 1.996-.012 3.99 0 5.986-1.76-2.075-3.497-4.167-5.25-6.25a2.11 2.11 0 0 0-1.987-.788 1.184 1.184 0 0 0-1.052 1.128"
		/>
	</svg>
);
const ForwardRef = forwardRef(SvgNginNginx);
const Memo = memo(ForwardRef);
export default Memo;
