import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgAdtranNetVanta = (
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
		<g clipPath="url(#Adtran-NetVanta_svg__a)">
			<g clipPath="url(#Adtran-NetVanta_svg__b)">
				<path
					fill="#006C86"
					d="M22.148 8.374h.055c.04 0 .065.022.065.081 0 .04-.015.092-.065.092h-.055zm0 .26h.032c.095 0 .085.063.085.136a.3.3 0 0 0 .016.12h.121a1 1 0 0 1-.014-.182c0-.111-.08-.118-.107-.12v-.003c.081-.014.11-.073.11-.151 0-.106-.054-.164-.138-.164h-.228v.62h.123zm.06-.584c-.26 0-.47.236-.47.532s.21.536.47.536c.258 0 .465-.24.465-.536s-.207-.532-.465-.532m0 .967c-.212 0-.381-.196-.381-.435 0-.238.17-.432.38-.432.208 0 .379.194.379.432 0 .24-.171.435-.378.435"
				/>
				<mask
					id="Adtran-NetVanta_svg__c"
					width={22}
					height={6}
					x={1}
					y={8}
					maskUnits="userSpaceOnUse"
					style={{
						maskType: "luminance",
					}}
				>
					<path fill="#fff" d="M1 8h22v6H1z" />
				</mask>
				<g mask="url(#Adtran-NetVanta_svg__c)">
					<path
						fill="#006C86"
						d="M13.803 12.798c.892.292.814 1.18.814 1.18h1.07l.38-.912h1.926l.37.91h1.978v-3.3h1.013c.35 0 .697.392.634 1.17V14H23v-2.353c0-1.38-.661-2.105-1.519-2.11h-2.183v3.846l-1.522-3.82h-.696l-1.472 3.664c0-.496-.554-.836-.554-.836.49.015 1.068-2.626-.665-2.827h-2.784v3.18h-.288c-.19-.03-.408-.473-.409-.738V9.11H21.37V8H4.365L4.86 9.11h5.003v3.134c.001.888.864 1.714 1.704 1.735h1.091v-1.18zM6.956 9.616H6v3.717h-.033L4.006 8h-.57L1 13.978h.316l.475-1.091h2.88l.412 1.091h3.068c.731-.013 1.522-1.087 1.522-2.197 0-.896-.593-2.181-1.52-2.165H6.95m5.702 1.083h1.5c.609.023.634 1.094.016 1.097h-1.516zm4.388-.177.524 1.49h-1.102zm-9.994.196.862-.002c.254.009.658.435.668 1.104.041.595-.353 1-.632.99h-.898zM3.322 9.056l.936 2.69-2.06-.004z"
					/>
				</g>
			</g>
		</g>
		<defs>
			<clipPath id="Adtran-NetVanta_svg__a">
				<path fill="#fff" d="M0 0h24v24H0z" />
			</clipPath>
			<clipPath id="Adtran-NetVanta_svg__b">
				<path fill="#fff" d="M1 8h22v6H1z" />
			</clipPath>
		</defs>
	</svg>
);
const ForwardRef = forwardRef(SvgAdtranNetVanta);
const Memo = memo(ForwardRef);
export default Memo;
