import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgMtnIrancellMtnDigitalWallet = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		fill="none"
		viewBox="0 0 24 24"
		ref={ref}
		{...props}
	>
		<g clipPath="url(#MTN_Irancell-MTNDigitalWallet_svg__a)">
			<path fill="#FFBE00" d="M2 2h20v20H2z" />
			<path
				fill="#005C87"
				d="M12 18.165c5.318 0 9.63-2.637 9.63-5.89s-4.312-5.89-9.63-5.89-9.63 2.637-9.63 5.89 4.312 5.89 9.63 5.89"
			/>
			<path
				fill="#fff"
				d="m15.522 9.96-.12 3.815h.162l1.218-3.815h1.372L16.424 15h-2.1l.19-3.227L13.576 15h-2.1l.048-5.04h1.373l-.127 3.815h.162l1.224-3.815zM9.165 9.96q.916 0 1.309.462.287.35.287.875 0 .189-.035.399l-.273 1.561q-.14.791-.686 1.267T8.353 15H6.316l.889-5.04zm-.441 1.092h-.455l-.497 2.856h.665q.33 0 .51-.175.19-.181.26-.588l.203-1.148q.028-.154.028-.28 0-.665-.714-.665"
			/>
		</g>
		<defs>
			<clipPath id="MTN_Irancell-MTNDigitalWallet_svg__a">
				<path fill="#fff" d="M2 2h20v20H2z" />
			</clipPath>
		</defs>
	</svg>
);
const ForwardRef = forwardRef(SvgMtnIrancellMtnDigitalWallet);
const Memo = memo(ForwardRef);
export default Memo;
