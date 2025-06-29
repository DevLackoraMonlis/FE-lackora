import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgBehinRahkarCoreLogSystemLogger = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		fill="none"
		viewBox="0 0 24 24"
		ref={ref}
		{...props}
	>
		<g clipPath="url(#BehinRahkar-CoreLogSystemLogger_svg__a)">
			<g
				fill="#FF7518"
				fillRule="evenodd"
				clipPath="url(#BehinRahkar-CoreLogSystemLogger_svg__b)"
				clipRule="evenodd"
			>
				<path d="M14.053 22c-6.223-.14-11.22-4.567-11.22-10.003S7.83 2.14 14.053 2v2.458c-2.276.067-4.335.899-5.836 2.207-1.574 1.364-2.544 3.253-2.544 5.338s.97 3.968 2.544 5.338c1.508 1.308 3.56 2.134 5.836 2.207v2.458z" />
				<path d="M14.36 5.369c4.217 0 7.64 2.965 7.64 6.628 0 3.662-3.416 6.628-7.64 6.628q-.176.002-.353-.006v-2.464q.177.01.354.012c1.324 0 2.531-.465 3.396-1.223.873-.752 1.41-1.798 1.41-2.947s-.537-2.195-1.41-2.947-2.072-1.223-3.396-1.223c-.118 0-.236 0-.354.012V5.381c.118 0 .236-.006.354-.006z" />
				<path d="M14.007 15.47c2.203 0 3.993-1.56 3.993-3.467s-1.797-3.467-3.993-3.467c-2.197 0-3.994 1.56-3.994 3.467s1.797 3.467 3.994 3.467" />
			</g>
		</g>
		<defs>
			<clipPath id="BehinRahkar-CoreLogSystemLogger_svg__a">
				<path fill="#fff" d="M0 0h24v24H0z" />
			</clipPath>
			<clipPath id="BehinRahkar-CoreLogSystemLogger_svg__b">
				<path fill="#fff" d="M2 2h20v20H2z" />
			</clipPath>
		</defs>
	</svg>
);
const ForwardRef = forwardRef(SvgBehinRahkarCoreLogSystemLogger);
const Memo = memo(ForwardRef);
export default Memo;
