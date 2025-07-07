import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgAu = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		xmlnsXlink="http://www.w3.org/1999/xlink"
		viewBox="0 0 10080 5040"
		width="1em"
		height="1em"
		ref={ref}
		{...props}
	>
		<defs>
			<clipPath id="au_svg__b">
				<path d="M0 0h6v3H0z" />
			</clipPath>
			<clipPath id="au_svg__c">
				<path d="M0 0v1.5h6V3zm6 0H3v3H0z" />
			</clipPath>
			<path
				id="au_svg__a"
				d="m0-360 69.421 215.845 212.038-80.301L155.99-35.603l194.985 115.71-225.881 19.651 31.105 224.59L0 160l-156.198 164.349 31.105-224.59-225.881-19.651 194.986-115.711-125.471-188.853 212.038 80.301z"
			/>
			<path
				id="au_svg__e"
				d="M0-210 54.86-75.508l144.862 10.614L88.765 28.842l34.67 141.052L0 93.334l-123.435 76.56 34.67-141.052-110.957-93.736L-54.86-75.508z"
			/>
			<use xlinkHref="#au_svg__a" id="au_svg__d" transform="scale(2.1)" />
		</defs>
		<path fill="#012169" d="M0 0h10080v5040H0z" />
		<path
			stroke="#fff"
			strokeWidth={0.6}
			d="m0 0 6 3m0-3L0 3"
			clipPath="url(#au_svg__b)"
			transform="scale(840)"
		/>
		<path
			stroke="#e4002b"
			strokeWidth={0.4}
			d="m0 0 6 3m0-3L0 3"
			clipPath="url(#au_svg__c)"
			transform="scale(840)"
		/>
		<path stroke="#fff" strokeWidth={840} d="M2520 0v2520M0 1260h5040" />
		<path stroke="#e4002b" strokeWidth={504} d="M2520 0v2520M0 1260h5040" />
		<g fill="#fff">
			<use xlinkHref="#au_svg__d" x={2520} y={3780} />
			<use xlinkHref="#au_svg__a" x={7560} y={4200} />
			<use xlinkHref="#au_svg__a" x={6300} y={2205} />
			<use xlinkHref="#au_svg__a" x={7560} y={840} />
			<use xlinkHref="#au_svg__a" x={8680} y={1869} />
			<use xlinkHref="#au_svg__e" x={8064} y={2730} />
		</g>
	</svg>
);
const ForwardRef = forwardRef(SvgAu);
const Memo = memo(ForwardRef);
export default Memo;
