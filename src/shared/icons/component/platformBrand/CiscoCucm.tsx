import * as React from "react";
import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgCiscoCucm = (
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
		<g clipPath="url(#CiscoCUCM_svg__a)">
			<path
				fill="#007EBA"
				stroke="#fff"
				strokeWidth={0.4}
				d="m18.875 18.664.014-9.72H2.335l-.014 9.72zM21.666 6.316H5.11L2.335 8.944h16.554z"
			/>
			<path
				fill="#007EBA"
				stroke="#fff"
				strokeWidth={0.4}
				d="m21.645 16.076.02-9.76-2.75 2.608-.013 9.76z"
			/>
			<path
				fill="#fff"
				stroke="#fff"
				strokeWidth={0.08}
				d="M17.216 16.614v-3.092l-1.854 1.485zM4.121 16.614v-3.092l1.854 1.485zM5.366 10.477v3.092l-1.854-1.486zM15.83 10.477v3.092l1.854-1.486z"
			/>
			<path
				stroke="#fff"
				strokeWidth={0.76}
				d="M16.239 11.982h-1.124M16.627 14.98h1.398M4.616 14.98H3.131M4.683 12.077h1.399"
			/>
			<path fill="#fff" d="m13.89 12.144-.006 5.612H7.406L7.4 12.144z" />
			<path
				stroke="#030303"
				strokeWidth={0.15}
				d="M13.194 12.48H8.11v4.739h5.085z"
			/>
			<path
				fill="#fff"
				d="M11.977 10.147s.32-.033.394.29l.074 1.035 2.134.356.215-.464-.536-1.29c-2.743-.68-3.7-.464-3.7-.464h.107s-.963-.215-3.7.463l-.535 1.291.214.464 2.134-.356.074-1.036c.073-.322.395-.289.395-.289h2.743z"
			/>
			<path
				fill="#231F20"
				d="M9.36 13.394h.395l.928 2.232h.032l.927-2.232h.395v2.689h-.31V14.04h-.026l-.853 2.043h-.299l-.853-2.043H9.67v2.043h-.31z"
			/>
		</g>
		<defs>
			<clipPath id="CiscoCUCM_svg__a">
				<path fill="#fff" d="M2 6h20v13H2z" />
			</clipPath>
		</defs>
	</svg>
);
const ForwardRef = forwardRef(SvgCiscoCucm);
const Memo = memo(ForwardRef);
export default Memo;
