import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgBehinRahkarMtnMiddleware = (
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
		<g clipPath="url(#BehinRahkar-MTNMiddleware_svg__a)">
			<g clipPath="url(#BehinRahkar-MTNMiddleware_svg__b)">
				<path fill="#FFBE00" d="M2 2h20v20H2z" />
				<path
					fill="#005C87"
					d="M12 18.165c5.318 0 9.63-2.637 9.63-5.89s-4.312-5.89-9.63-5.89-9.63 2.637-9.63 5.89 4.312 5.89 9.63 5.89"
				/>
				<path
					fill="#fff"
					d="m7.84 9.96.75 2.415L10.2 9.96h1.322L10.633 15H9.366l.504-2.842-1.078 1.694h-.917L7.4 12.158 6.895 15h-1.26l.89-5.04zm8.362 0-.12 3.815h.162l1.218-3.815h1.372L17.104 15h-2.1l.19-3.227L14.256 15h-2.1l.049-5.04h1.372l-.126 3.815h.16l1.226-3.815z"
				/>
			</g>
		</g>
		<defs>
			<clipPath id="BehinRahkar-MTNMiddleware_svg__a">
				<path fill="#fff" d="M0 0h24v24H0z" />
			</clipPath>
			<clipPath id="BehinRahkar-MTNMiddleware_svg__b">
				<path fill="#fff" d="M2 2h20v20H2z" />
			</clipPath>
		</defs>
	</svg>
);
const ForwardRef = forwardRef(SvgBehinRahkarMtnMiddleware);
const Memo = memo(ForwardRef);
export default Memo;
