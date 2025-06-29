import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgDellMfp = (
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
		<g clipPath="url(#Dell-MFP_svg__a)">
			<g clipPath="url(#Dell-MFP_svg__b)">
				<path
					fill="#007DB8"
					d="m11.37 9.765-2.236 1.72c-.23-.86-.976-1.492-1.893-1.492H5.636v3.956h1.605c.917 0 1.72-.63 1.893-1.49l2.236 1.719 2.237-1.72v1.491h2.522v-.802h-1.662V9.993h-.917v1.492l-2.123 1.719-.458-.401L12 12l1.088-.86-.63-.515-2.12 1.662-.459-.401L12 10.28zm-4.872 1.031h.688c.143 0 .284.032.411.092q.196.09.348.252c.1.108.183.237.24.381a1.3 1.3 0 0 1-.22 1.317c-.097.11-.213.203-.344.265a1 1 0 0 1-.437.1h-.688zm12.496 2.35v.803H16.47V9.993h.917v3.154zM12 3c-4.93 0-9 4.07-9 9s4.013 9 9 9 9-4.013 9-9-4.07-9-9-9m0 .917q.841 0 1.63.163a8 8 0 0 1 1.518.47q.728.309 1.374.744c.43.288.831.62 1.195.985q.55.55.986 1.196.436.647.744 1.373a8 8 0 0 1 .633 3.149q-.001.84-.163 1.63a8 8 0 0 1-.47 1.518 8 8 0 0 1-.744 1.374q-.435.646-.986 1.195a8.2 8.2 0 0 1-1.195.986q-.646.436-1.374.744a8 8 0 0 1-3.148.633q-.841-.001-1.63-.163a8 8 0 0 1-2.892-1.216q-.646-.436-1.195-.986a7.961 7.961 0 0 1-1.731-2.562 8 8 0 0 1-.47-1.52A8 8 0 0 1 3.917 12q.001-.841.163-1.63a8 8 0 0 1 .47-1.518 8.11 8.11 0 0 1 2.925-3.555q.647-.437 1.374-.744A8.136 8.136 0 0 1 12 3.917"
				/>
			</g>
		</g>
		<defs>
			<clipPath id="Dell-MFP_svg__a">
				<path fill="#fff" d="M0 0h24v24H0z" />
			</clipPath>
			<clipPath id="Dell-MFP_svg__b">
				<path fill="#fff" d="M3 3h18v18H3z" />
			</clipPath>
		</defs>
	</svg>
);
const ForwardRef = forwardRef(SvgDellMfp);
const Memo = memo(ForwardRef);
export default Memo;
