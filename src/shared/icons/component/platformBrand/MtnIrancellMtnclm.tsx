import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgMtnIrancellMtnclm = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		fill="none"
		viewBox="0 0 24 24"
		ref={ref}
		{...props}
	>
		<g clipPath="url(#MTN_Irancell-MTNCLM_svg__a)">
			<path fill="#FFBE00" d="M2 2h20v20H2z" />
			<path
				fill="#005C87"
				d="M12 18.165c5.318 0 9.63-2.637 9.63-5.89s-4.312-5.89-9.63-5.89-9.63 2.637-9.63 5.89 4.312 5.89 9.63 5.89"
			/>
			<path
				fill="#fff"
				d="M6.764 15.098q-1.001 0-1.386-.434-.266-.307-.266-.861 0-.238.049-.511l.287-1.61q.315-1.77 2.275-1.771.812 0 1.232.35.42.343.42.945 0 .28-.084.56a2 2 0 0 1-.154.406l-.077.14H7.82q.232-.266.232-.756 0-.26-.133-.406-.134-.154-.392-.154-.707 0-.84.784l-.245 1.414q-.035.182-.035.357 0 .462.553.462.665 0 .798-.749h1.26l-.035.203q-.28 1.63-2.22 1.631M12.717 15H9.525l.89-5.04h1.26l-.694 3.948h1.932zm2.766-5.04.749 2.415 1.61-2.415h1.323L18.276 15h-1.267l.504-2.842-1.078 1.694h-.917l-.476-1.694L14.538 15h-1.26l.889-5.04z"
			/>
		</g>
		<defs>
			<clipPath id="MTN_Irancell-MTNCLM_svg__a">
				<path fill="#fff" d="M2 2h20v20H2z" />
			</clipPath>
		</defs>
	</svg>
);
const ForwardRef = forwardRef(SvgMtnIrancellMtnclm);
const Memo = memo(ForwardRef);
export default Memo;
