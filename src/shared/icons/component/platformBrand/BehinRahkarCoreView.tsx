import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgBehinRahkarCoreView = (
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
		<g
			fill="#184D9E"
			fillRule="evenodd"
			clipPath="url(#BehinRahkar-CoreView_svg__a)"
			clipRule="evenodd"
		>
			<path d="M14.972 13.919q2.524.009 5.048 0c.26 0 .34.003.34.003s-.011 3.74 0 5.446l1.633 1.651q.006-3.855 0-7.71c0-.705-.311-1.01-1.007-1.014H13.37l1.602 1.62zM21.993 3.027c0-.704-.311-1.01-1.007-1.013H13.29c-.748 0-1.036.291-1.036 1.047v7.604c.516-.52.96-.978 1.416-1.419.146-.139.208-.197.225-.215V3.637h6.464v6.49l-5.29.007-.066.06S14 11.205 13.45 11.757h7.523c.723 0 1.028-.292 1.028-1.02V3.027zM3.01 2.007c-.702 0-1.007.312-1.01 1.01v7.71c0 .75.29 1.037 1.046 1.037h7.588c-.519-.516-.976-.96-1.416-1.418l-.214-.226H3.62V3.644h6.478l.007 5.3.059.066s1.01 1.006 1.56 1.558V3.03c0-.725-.29-1.03-1.017-1.03h-7.7zM2.041 21.03c0 .704.312 1.012 1.008 1.012h7.696c.748 0 1.035-.291 1.035-1.047V13.39c-.516.52-.959.979-1.416 1.42l-.225.214v5.394H3.676v-6.49l5.293-.007.066-.059s1.004-1.013 1.554-1.564H3.066c-.723 0-1.028.291-1.028 1.02q-.005 3.855 0 7.71z" />
		</g>
		<defs>
			<clipPath id="BehinRahkar-CoreView_svg__a">
				<path fill="#fff" d="M0 0h24v24H0z" />
			</clipPath>
		</defs>
	</svg>
);
const ForwardRef = forwardRef(SvgBehinRahkarCoreView);
const Memo = memo(ForwardRef);
export default Memo;
