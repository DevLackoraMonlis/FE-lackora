import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgAsa = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		fill="none"
		viewBox="0 0 24 24"
		ref={ref}
		{...props}
	>
		<g clipPath="url(#ASA_svg__a)">
			<path fill="#000" d="M4.34 16.202v5.575h13.837v-5.575" />
			<path stroke="#fff" strokeWidth={0.4} d="M4.34 16.202v5.575h13.837v-5.575" />
			<path fill="#007EBA" stroke="#fff" strokeWidth={0.4} d="m4.34 5.081 2.413-1.893h13.902L18.176 5.08z" />
			<path
				fill="#000"
				stroke="#fff"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={0.4}
				d="m18.176 21.883 2.48-2.011v-5.651l-2.48 1.893z"
			/>
			<path
				stroke="#fff"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={0.4}
				d="M18.177 18.008H4.339M18.177 19.93H4.339M20.468 18.26l-2.18 1.7M8.437 20.024v1.747M13.786 20.024v1.747M11.22 18.096v1.74M5.87 18.096v1.74M16.569 18.096v1.74"
			/>
			<path fill="#007EBA" stroke="#fff" strokeWidth={0.4} d="M18.24 4.981v13.033H4.27V4.958z" />
			<path fill="#007EBA" stroke="#fff" strokeWidth={0.4} d="M20.567 16.02V3.235l-2.373 1.793v12.904z" />
			<path
				stroke="#fff"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={0.4}
				d="M20.041 16.548v2.064M19.24 19.221v2.064"
			/>
			<path
				fill="#fff"
				d="M6.952 9.935h5.396v-.37l1.204.734-1.204.75v-.363H6.952zM15.253 11.87h-4.536v-.37l-1.204.733 1.204.75v-.363h4.536z"
			/>
			<path
				fill="#fff"
				stroke="#000"
				strokeWidth={0.2}
				d="M16.996 16.507a.448.448 0 1 1-.104-.892.448.448 0 0 1 .104.892Z"
			/>
			<path fill="#fff" stroke="#000" strokeWidth={0.2} d="m14.529 13.299-.77.95 2.745 2.237.77-.952z" />
			<path
				fill="#fff"
				stroke="#000"
				strokeWidth={0.2}
				d="M7.344 10.645a4.15 4.15 0 0 0 3.642 4.596 4.147 4.147 0 0 0 4.583-3.653c.257-2.274-1.374-4.338-3.642-4.596a4.146 4.146 0 0 0-4.583 3.653Zm.573.064a3.566 3.566 0 0 1 3.94-3.142c1.947.223 3.356 1.999 3.133 3.957a3.566 3.566 0 0 1-3.94 3.142 3.576 3.576 0 0 1-3.133-3.951z"
			/>
			<path
				fill="#fff"
				stroke="#000"
				strokeWidth={0.2}
				d="M6.835 10.826c-.257 2.275 1.374 4.338 3.642 4.596 2.268.264 4.326-1.377 4.583-3.652.258-2.274-1.373-4.338-3.642-4.596a4.146 4.146 0 0 0-4.583 3.652Zm.573.065a3.566 3.566 0 0 1 3.94-3.142c1.953.222 3.356 1.999 3.134 3.957a3.57 3.57 0 0 1-3.94 3.142 3.57 3.57 0 0 1-3.134-3.951z"
			/>
			<path stroke="#fff" strokeWidth={0.5} d="M15.253 12.327h2.292M5.058 10.299H7.35" />
		</g>
		<defs>
			<clipPath id="ASA_svg__a">
				<path fill="#fff" d="M4 3h17v19H4z" />
			</clipPath>
		</defs>
	</svg>
);
const ForwardRef = forwardRef(SvgAsa);
const Memo = memo(ForwardRef);
export default Memo;
