import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgSymantecManhuntNetworkSecurity = (
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
		<g clipPath="url(#Symantec-ManhuntNetworkSecurity_svg__a)">
			<path
				fill="#fff"
				d="M20.4 0H3.6A3.6 3.6 0 0 0 0 3.6v16.8A3.6 3.6 0 0 0 3.6 24h16.8a3.6 3.6 0 0 0 3.6-3.6V3.6A3.6 3.6 0 0 0 20.4 0"
			/>
			<path
				fill="#FDB511"
				d="M18.647 4.547v.562h.562v-.562zM11.166 7.64a5.4 5.4 0 1 1-.057 0m.057-2.7a8.1 8.1 0 1 0 .056 0zm9.225-.957v.563h.562v-.563zm0-1.125v.563h.562v-.563z"
			/>
			<path
				fill="#000"
				fillRule="evenodd"
				d="M14.656 10.79v.563c-1.574 1.519-1.912 2.813-2.193 3.994-.112.731-.112 1.181-.956 1.294-.168 0-.562-.17-.73-.45-.225-.394-.844-1.913-1.406-2.813-.394-.787-1.012-1.462-1.574-2.137-.225-.282-.338-.507-.169-.732.169-.28.337-.225.562-.168 1.406.618 2.193 1.575 2.868 2.925.618-1.52.956-2.307 2.473-4.163h.563v-.562h.562v-.62h.562V7.36h1.125v.563h-.563V6.797h.563v-.563h2.867V5.11h.562v.563h-2.811v-.563h.562v1.688h.563v-2.25h1.686V3.422h.619v.562h-1.743V7.36h-.562v.563h-.563v.619h-.562v.562h-1.18v-.562h.562v1.125h-.563v.562h-.562v.563z"
				clipRule="evenodd"
			/>
		</g>
		<defs>
			<clipPath id="Symantec-ManhuntNetworkSecurity_svg__a">
				<path fill="#fff" d="M0 0h24v24H0z" />
			</clipPath>
		</defs>
	</svg>
);
const ForwardRef = forwardRef(SvgSymantecManhuntNetworkSecurity);
const Memo = memo(ForwardRef);
export default Memo;
