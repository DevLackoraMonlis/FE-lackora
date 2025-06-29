import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgAppleMcintosh = (
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
		<g fill="#37474F" clipPath="url(#Apple-Mcintosh_svg__a)">
			<path d="M20.04 15.895a.42.42 0 0 0-.293-.187 2.897 2.897 0 0 1-.488-5.639.417.417 0 0 0 .224-.62 4.86 4.86 0 0 0-3.507-2.45 6.9 6.9 0 0 0-2.183.468c-.5.202-1.029.325-1.567.366a5.3 5.3 0 0 1-1.567-.366A6.9 6.9 0 0 0 8.476 7C6.92 7 3.893 9.206 3.893 13.25c0 3.843 2.803 8.75 5 8.75a5.3 5.3 0 0 0 2.416-.557c.283-.156.595-.25.917-.277.322.027.634.121.917.277.75.373 1.578.564 2.416.557 1.742 0 3.708-2.99 4.531-5.761a.42.42 0 0 0-.05-.344" />
			<path d="M11.81 7a4.59 4.59 0 0 0 4.583-4.583.417.417 0 0 0-.417-.417 4.59 4.59 0 0 0-4.583 4.583c0 .23.186.417.416.417" />
		</g>
		<defs>
			<clipPath id="Apple-Mcintosh_svg__a">
				<path fill="#fff" d="M0 0h24v24H0z" />
			</clipPath>
		</defs>
	</svg>
);
const ForwardRef = forwardRef(SvgAppleMcintosh);
const Memo = memo(ForwardRef);
export default Memo;
