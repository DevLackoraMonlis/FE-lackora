import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgWindows = (
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
			fill="#00ADEF"
			d="M20.813 11.906h-7.72c-.355 0-.593-.237-.593-.594V4.96c0-.296.238-.534.475-.593L20.694 3c.178 0 .356 0 .475.119a.54.54 0 0 1 .237.475v7.719c0 .356-.237.593-.593.593M10.719 11.906H3.594c-.357 0-.594-.237-.594-.594v-4.75c0-.296.237-.534.475-.593L10.6 4.78c.178 0 .356 0 .475.119a.54.54 0 0 1 .238.475v5.938c0 .356-.238.593-.594.593M20.813 22h-.12l-7.718-1.366a.58.58 0 0 1-.475-.593v-6.353c0-.357.238-.594.594-.594h7.719c.356 0 .593.237.593.594v7.718a.54.54 0 0 1-.237.475c-.06.06-.238.119-.357.119M10.719 20.219H10.6L3.475 19.03c-.238-.06-.475-.297-.475-.593v-4.75c0-.357.237-.594.594-.594h7.125c.356 0 .594.237.594.594v5.937a.54.54 0 0 1-.238.475c-.06.06-.237.119-.356.119"
		/>
	</svg>
);
const ForwardRef = forwardRef(SvgWindows);
const Memo = memo(ForwardRef);
export default Memo;
