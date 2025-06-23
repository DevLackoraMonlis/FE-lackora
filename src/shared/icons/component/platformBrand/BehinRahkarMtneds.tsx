import * as React from "react";
import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgBehinRahkarMtneds = (
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
		<g clipPath="url(#BehinRahkar-MTNEDS_svg__a)">
			<g clipPath="url(#BehinRahkar-MTNEDS_svg__b)">
				<path fill="#FFBE00" d="M2 2h20v20H2z" />
				<path
					fill="#005C87"
					d="M12 18.165c5.318 0 9.63-2.637 9.63-5.89s-4.312-5.89-9.63-5.89-9.63 2.637-9.63 5.89 4.312 5.89 9.63 5.89"
				/>
				<path
					fill="#fff"
					d="M15.969 13.36q0 .552.792.552.8 0 .8-.496 0-.264-.272-.432a2.7 2.7 0 0 0-.664-.28 12 12 0 0 1-.776-.256 1.7 1.7 0 0 1-.656-.464 1.18 1.18 0 0 1-.272-.792q0-2.008 2.584-2.008.944 0 1.424.36.488.352.488.984 0 .232-.064.448a1 1 0 0 1-.12.296l-.064.096h-1.416a.65.65 0 0 0 .176-.464q0-.52-.68-.52-.856 0-.856.544 0 .271.272.432t.656.256q.392.088.784.224t.664.456q.272.312.272.816 0 1.015-.608 1.512-.608.488-1.872.488t-1.728-.448q-.345-.336-.344-.928 0-.224.048-.488l.024-.128h1.44l-.016.096a1 1 0 0 0-.016.144M12.346 9.24q1.047 0 1.495.528.33.4.329 1 0 .216-.04.456l-.312 1.784q-.16.904-.784 1.448-.625.544-1.617.544H9.09l1.016-5.76zm-.505 1.248h-.52l-.567 3.264h.76q.375 0 .584-.2.215-.208.295-.672l.232-1.312q.033-.176.033-.32 0-.76-.816-.76M8.168 15H4.152l1.016-5.76h4.016l-.224 1.248H6.384l-.184 1.08h2.128l-.224 1.248H5.976l-.16.936h2.576z"
				/>
			</g>
		</g>
		<defs>
			<clipPath id="BehinRahkar-MTNEDS_svg__a">
				<path fill="#fff" d="M0 0h24v24H0z" />
			</clipPath>
			<clipPath id="BehinRahkar-MTNEDS_svg__b">
				<path fill="#fff" d="M2 2h20v20H2z" />
			</clipPath>
		</defs>
	</svg>
);
const ForwardRef = forwardRef(SvgBehinRahkarMtneds);
const Memo = memo(ForwardRef);
export default Memo;
