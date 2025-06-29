import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgCitrixPresentationServer = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		fill="none"
		viewBox="0 0 24 24"
		ref={ref}
		{...props}
	>
		<g fillRule="evenodd" clipPath="url(#Citrix-PresentationServer_svg__a)" clipRule="evenodd">
			<path
				fill="#000"
				d="M7.603 9.805v1.112h.97v3.145h1.27v-3.145h.97V9.805zm5.951 2.56c.488-.166.795-.62.795-1.204 0-.397-.12-.717-.354-.952-.265-.264-.667-.404-1.162-.404h-1.674v4.257h1.276V12.79l.812 1.271h1.608zm-1.119-1.522c.165.001.387.018.502.133q.086.085.086.248c0 .267-.172.378-.587.381zm3.887 3.219v-4.26h-1.265v4.26zm3.407-2.298 1.409-1.957h-1.566l-.585.902-.505-.902H16.92l1.308 1.95-1.705 2.305h1.545l.9-1.255.71 1.255h1.53zM5.982 9.803v4.259h1.276v-4.26z"
			/>
			<path
				fill="#CC2131"
				d="M6.62 9.544a.8.8 0 1 0 0-1.602.8.8 0 0 0 0 1.602m9.075 6.378a.8.8 0 1 0 0-1.602.8.8 0 0 0 0 1.602"
			/>
			<path
				fill="#000"
				d="M4.922 12.388c-.189.314-.56.515-.936.515-.536 0-.93-.434-.93-.97 0-.537.394-.972.93-.972.376 0 .747.202.936.515l.672-1.086a2.23 2.23 0 1 0 0 3.084zm16.492-2.414a.172.172 0 0 1 .342 0 .172.172 0 0 1-.342 0m.171.148a.15.15 0 0 0 .137-.091.15.15 0 0 0-.032-.162.148.148 0 1 0-.105.253m.031-.143c.022-.003.046-.013.046-.046 0-.045-.04-.054-.08-.054h-.064v.188h.03v-.074h.033c.035 0 .048.01.048.05q0 .014.002.024h.031a.1.1 0 0 1-.004-.031c0-.034-.014-.05-.042-.057m-.067-.009v-.069h.032q.047 0 .048.032 0 .037-.048.037z"
			/>
		</g>
		<defs>
			<clipPath id="Citrix-PresentationServer_svg__a">
				<path fill="#fff" d="M0 0h24v24H0z" />
			</clipPath>
		</defs>
	</svg>
);
const ForwardRef = forwardRef(SvgCitrixPresentationServer);
const Memo = memo(ForwardRef);
export default Memo;
