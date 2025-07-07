import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgNGmyirancell = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		fill="none"
		viewBox="0 0 24 24"
		ref={ref}
		{...props}
	>
		<g clipPath="url(#NGmyirancell_svg__a)">
			<path fill="#FFBE00" d="M2 2h20v20H2z" />
			<path
				fill="#005C87"
				d="M12 18.165c5.318 0 9.63-2.637 9.63-5.89s-4.312-5.89-9.63-5.89-9.63 2.637-9.63 5.89 4.312 5.89 9.63 5.89"
			/>
			<path
				fill="#fff"
				d="M14.058 15.098q-.994 0-1.373-.462-.258-.322-.258-.882 0-.26.056-.567l.244-1.4q.33-1.875 2.297-1.876.811 0 1.232.35.42.343.42.945 0 .245-.07.497a2 2 0 0 1-.127.378l-.07.126h-1.238a.97.97 0 0 0 .181-.581q0-.63-.524-.63-.707 0-.848.819l-.238 1.344q-.035.19-.035.371 0 .483.567.483.574 0 .736-.574h-.575l.14-.777h1.855l-.111.602-.035.203q-.295 1.63-2.226 1.631M12.194 9.96 11.312 15h-1.267l-.882-2.758L8.687 15H7.42l.889-5.04H9.61l.868 2.576.455-2.576z"
			/>
		</g>
		<defs>
			<clipPath id="NGmyirancell_svg__a">
				<path fill="#fff" d="M2 2h20v20H2z" />
			</clipPath>
		</defs>
	</svg>
);
const ForwardRef = forwardRef(SvgNGmyirancell);
const Memo = memo(ForwardRef);
export default Memo;
