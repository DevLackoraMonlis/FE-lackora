import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgMtnIrancellMtnpg = (
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
		<g clipPath="url(#MTN_Irancell-MTNPG_svg__a)">
			<path fill="#FFBE00" d="M2 2h20v20H2z" />
			<path
				fill="#005C87"
				d="M12 18.165c5.318 0 9.63-2.637 9.63-5.89s-4.312-5.89-9.63-5.89-9.63 2.637-9.63 5.89 4.312 5.89 9.63 5.89"
			/>
			<path
				fill="#fff"
				d="M13.849 15.098q-.994 0-1.372-.462-.26-.322-.259-.882 0-.26.056-.567l.245-1.4q.33-1.875 2.296-1.876.812 0 1.232.35.42.343.42.945 0 .245-.07.497a2 2 0 0 1-.126.378l-.07.126h-1.239a.97.97 0 0 0 .182-.581q0-.63-.525-.63-.707 0-.847.819l-.238 1.344q-.035.19-.035.371 0 .483.567.483.575 0 .735-.574h-.574l.14-.777h1.855l-.112.602-.035.203q-.294 1.63-2.226 1.631M9.994 13.467h-.833L8.888 15h-1.26l.89-5.04h2.134q.792 0 1.127.364.245.28.245.714 0 .146-.028.308l-.14.791q-.105.58-.616.959-.51.37-1.246.371m.217-2.415h-.63l-.23 1.323h.622q.574 0 .665-.511l.05-.287a1 1 0 0 0 .013-.168q0-.105-.105-.231t-.385-.126"
			/>
		</g>
		<defs>
			<clipPath id="MTN_Irancell-MTNPG_svg__a">
				<path fill="#fff" d="M2 2h20v20H2z" />
			</clipPath>
		</defs>
	</svg>
);
const ForwardRef = forwardRef(SvgMtnIrancellMtnpg);
const Memo = memo(ForwardRef);
export default Memo;
