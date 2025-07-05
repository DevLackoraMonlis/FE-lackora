import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgCIconAdapterAws = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		fill="none"
		viewBox="0 0 32 32"
		ref={ref}
		{...props}
	>
		<path fill="#9D5025" d="M3.404 5.96 2 6.624v18.752l1.404.664 5.684-9.554z" />
		<path fill="#F58536" d="m6.678 25.314-3.274.726V5.96l3.274.706z" />
		<path fill="#9D5025" d="m4.952 5.224 1.726-.812 8.192 12.432-8.192 10.744-1.726-.812z" />
		<path fill="#F58536" d="m10.76 26.496-4.082 1.092V4.412l4.08 1.096z" />
		<path fill="#9D5025" d="m8.6 3.5 2.16-1.024 12.086 15.728-12.086 11.32-2.16-1.022V3.498z" />
		<path fill="#F58536" d="m15.996 27.712-5.236 1.812V2.476l5.236 1.816z" />
		<path fill="#9D5025" d="M13.204 1.32 15.996 0l13.076 16.906L15.996 32l-2.792-1.32z" />
		<path fill="#F58536" d="M30 25.372 15.996 32V0L30 6.628z" />
	</svg>
);
const ForwardRef = forwardRef(SvgCIconAdapterAws);
const Memo = memo(ForwardRef);
export default Memo;
