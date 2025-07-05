import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgMtnIrancellMtnMyIrancell = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		fill="none"
		viewBox="0 0 24 24"
		ref={ref}
		{...props}
	>
		<g clipPath="url(#MTN_Irancell-MTNMyIrancell_svg__a)">
			<path fill="#FFBE00" d="M2 2h20v20H2z" />
			<path
				fill="#005C87"
				d="M12 18.165c5.318 0 9.63-2.637 9.63-5.89s-4.312-5.89-9.63-5.89-9.63 2.637-9.63 5.89 4.312 5.89 9.63 5.89"
			/>
			<path
				fill="#fff"
				d="M18.404 9.96 17.522 15h-1.267l.89-5.04zM14.186 11.731 15.37 9.96h1.26l-2.156 3.101L14.13 15h-1.267l.343-1.939-1.064-3.101h1.337l.546 1.771zM7.96 9.96l.75 2.415 1.61-2.415h1.322L10.753 15H9.486l.504-2.842-1.078 1.694h-.917l-.476-1.694L7.015 15h-1.26l.89-5.04z"
			/>
		</g>
		<defs>
			<clipPath id="MTN_Irancell-MTNMyIrancell_svg__a">
				<path fill="#fff" d="M2 2h20v20H2z" />
			</clipPath>
		</defs>
	</svg>
);
const ForwardRef = forwardRef(SvgMtnIrancellMtnMyIrancell);
const Memo = memo(ForwardRef);
export default Memo;
