import * as React from "react";
import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgUm = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		xmlnsXlink="http://www.w3.org/1999/xlink"
		viewBox="0 0 7410 3900"
		width="1em"
		height="1em"
		ref={ref}
		{...props}
	>
		<path fill="#b22234" d="M0 0h7410v3900H0z" />
		<path
			stroke="#fff"
			strokeWidth={300}
			d="M0 450h7410m0 600H0m0 600h7410m0 600H0m0 600h7410m0 600H0"
		/>
		<path fill="#3c3b6e" d="M0 0h2964v2100H0z" />
		<g fill="#fff">
			<g id="um_svg__d">
				<g id="um_svg__c">
					<g id="um_svg__e">
						<g id="um_svg__b">
							<path
								id="um_svg__a"
								d="m247 90 70.534 217.082-184.66-134.164h228.253L176.466 307.082z"
							/>
							<use xlinkHref="#um_svg__a" y={420} />
							<use xlinkHref="#um_svg__a" y={840} />
							<use xlinkHref="#um_svg__a" y={1260} />
						</g>
						<use xlinkHref="#um_svg__a" y={1680} />
					</g>
					<use xlinkHref="#um_svg__b" x={247} y={210} />
				</g>
				<use xlinkHref="#um_svg__c" x={494} />
			</g>
			<use xlinkHref="#um_svg__d" x={988} />
			<use xlinkHref="#um_svg__c" x={1976} />
			<use xlinkHref="#um_svg__e" x={2470} />
		</g>
	</svg>
);
const ForwardRef = forwardRef(SvgUm);
const Memo = memo(ForwardRef);
export default Memo;
