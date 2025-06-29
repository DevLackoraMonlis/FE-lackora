import type { SVGProps } from "react";
import { type Ref, forwardRef, memo } from "react";
const SvgPamGeneral = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		fill="none"
		viewBox="0 0 241 240"
		ref={ref}
		{...props}
	>
		<path fill="#B6DCFE" d="M117.5 62.5h100v45h-100z" />
		<path fill="#4788C7" d="M215 65v40h-95V65zm5-5H115v50h105z" />
		<path fill="#B6DCFE" d="M117.5 132.5h100v45h-100z" />
		<path fill="#4788C7" d="M215 135v40h-95v-40zm5-5H115v50h105z" />
		<path
			fill="#DFF0FE"
			d="m56.34 197.5-8.84-13.255V107.5H40c-9.65 0-17.5-7.85-17.5-17.5V60c0-9.65 7.85-17.5 17.5-17.5h45c9.65 0 17.5 7.85 17.5 17.5v30c0 9.65-7.85 17.5-17.5 17.5h-7.5v21.465l-5 5v7.07l5 5v7.93l-5 5v7.07l5 5v13.21L68.66 197.5zM45 57.5c-4.135 0-7.5 3.365-7.5 7.5v5c0 4.135 3.365 7.5 7.5 7.5h35c4.135 0 7.5-3.365 7.5-7.5v-5c0-4.135-3.365-7.5-7.5-7.5z"
		/>
		<path
			fill="#4788C7"
			d="M85 45c8.27 0 15 6.73 15 15v30c0 8.27-6.73 15-15 15H75v22.93l-5 5v9.14l5 5v5.86l-5 5v9.14l5 5v11.415L67.325 195h-9.65L50 183.485V105H40c-8.27 0-15-6.73-15-15V60c0-8.27 6.73-15 15-15zM45 80h35c5.515 0 10-4.485 10-10v-5c0-5.515-4.485-10-10-10H45c-5.515 0-10 4.485-10 10v5c0 5.515 4.485 10 10 10m40-40H40c-11.045 0-20 8.955-20 20v30c0 11.045 8.955 20 20 20h5v75l10 15h15l10-15v-15l-5-5v-5l5-5v-10l-5-5v-5l5-5v-20h5c11.045 0 20-8.955 20-20V60c0-11.045-8.955-20-20-20M45 75c-2.76 0-5-2.24-5-5v-5c0-2.76 2.24-5 5-5h35c2.76 0 5 2.24 5 5v5c0 2.76-2.24 5-5 5z"
		/>
		<path fill="#98CCFD" d="M60 195v-85h-5v80.985L57.675 195z" />
		<path
			fill="#98CCFD"
			d="M57.5 130a2.507 2.507 0 0 1-2.5-2.5v-20c0-1.375 1.125-2.5 2.5-2.5s2.5 1.125 2.5 2.5v20c0 1.375-1.125 2.5-2.5 2.5"
		/>
	</svg>
);
const ForwardRef = forwardRef(SvgPamGeneral);
const Memo = memo(ForwardRef);
export default Memo;
