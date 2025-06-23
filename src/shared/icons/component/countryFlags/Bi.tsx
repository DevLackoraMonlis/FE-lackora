import * as React from "react";
import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgBi = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		xmlnsXlink="http://www.w3.org/1999/xlink"
		viewBox="0 0 500 300"
		width="1em"
		height="1em"
		ref={ref}
		{...props}
	>
		<defs>
			<use xlinkHref="#bi_svg__e" id="bi_svg__f" x={250} y={106} />
			<g id="bi_svg__e" fill="#1eb53a">
				<g id="bi_svg__d">
					<g id="bi_svg__c">
						<g id="bi_svg__b">
							<path
								id="bi_svg__a"
								d="M0-20V0h20"
								transform="rotate(30 0 -20)"
							/>
							<use xlinkHref="#bi_svg__a" transform="scale(-1 1)" />
						</g>
						<use xlinkHref="#bi_svg__b" transform="rotate(120)" />
						<use xlinkHref="#bi_svg__b" transform="rotate(240)" />
					</g>
					<use xlinkHref="#bi_svg__c" transform="rotate(180)" />
				</g>
				<use xlinkHref="#bi_svg__d" fill="#ce1126" transform="scale(.82)" />
			</g>
		</defs>
		<path fill="#ce1126" d="M0 0h500L0 300h500z" />
		<path fill="#1eb53a" d="M0 0v300L500 0v300z" />
		<path stroke="#fff" strokeWidth={40} d="m0 0 500 300m0-300L0 300" />
		<circle cx={250} cy={150} r={85} fill="#fff" />
		<use xlinkHref="#bi_svg__f" />
		<use xlinkHref="#bi_svg__f" transform="rotate(120 250 150)" />
		<use xlinkHref="#bi_svg__f" transform="rotate(240 250 150)" />
	</svg>
);
const ForwardRef = forwardRef(SvgBi);
const Memo = memo(ForwardRef);
export default Memo;
