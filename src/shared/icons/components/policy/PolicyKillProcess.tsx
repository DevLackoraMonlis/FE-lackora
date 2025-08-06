import { type Ref, type SVGProps, forwardRef, memo } from "react";
const SvgPolicyKillProcess = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		fill="none"
		viewBox="0 0 41 40"
		ref={ref}
		{...props}
	>
		<path
			fill="#64717C"
			d="m32.696 4.76-4.657 1.907-5.552 5.567a.825.825 0 0 1-.611 1.391.82.82 0 0 1-.553-.22l-1.331 1.337c.13.148.217.336.217.55 0 .46-.372.833-.833.833a.82.82 0 0 1-.546-.215l-1.332 1.34a.83.83 0 0 1 .211.54c0 .462-.372.834-.833.834a.82.82 0 0 1-.538-.21l-2.165 2.179.53.657-9.614 9.452a.837.837 0 0 0 0 1.186l3.556 3.556a.84.84 0 0 0 1.187 0l9.613-9.45.593.594s.06-.062.656-.658c-.655-.655 6.549-11.29 9.39-14.132 2.387-2.387 2.915-5.82 2.612-7.039"
		/>
		<path
			fill="url(#PolicyKillProcess_svg__a)"
			d="M10.255 36.219a1.677 1.677 0 0 1-2.372 0l-3.558-3.557a1.68 1.68 0 0 1 0-2.373l9.988-9.836 5.93 5.928z"
		/>
		<path
			fill="#CFD8DC"
			d="M13.834 27.5a.833.833 0 1 0 0-1.666.833.833 0 0 0 0 1.665M8 33.333a.833.833 0 1 0 0-1.666.833.833 0 0 0 0 1.666"
		/>
		<path
			fill="#90A4AE"
			d="M36.177 3.333 32.696 4.76c.302 1.22-.225 4.652-2.612 7.038-2.84 2.842-11.04 11.04-12.525 12.525l2.967 1.775c3.847-3.845 11.162-11.162 12.687-12.685 4.149-4.15 2.964-10.079 2.964-10.079M19.132 18.87l-1.666-1.666a.833.833 0 0 1-1.178 1.178l1.665 1.666a.83.83 0 0 0 1.179 0 .834.834 0 0 0 0-1.178m2.5-2.5-1.666-1.666a.833.833 0 0 1-1.178 1.178l1.665 1.666a.83.83 0 0 0 1.179 0 .834.834 0 0 0 0-1.178m2.5-2.5-1.666-1.666a.833.833 0 0 1-1.178 1.178l1.665 1.666a.83.83 0 0 0 1.179 0 .834.834 0 0 0 0-1.178"
		/>
		<path
			fill="url(#PolicyKillProcess_svg__b)"
			d="m20.153 28.92-8.576-8.575a.83.83 0 0 1 0-1.178l.59-.59a.83.83 0 0 1 1.178 0l8.576 8.576a.833.833 0 0 1 0 1.179l-.59.589a.834.834 0 0 1-1.178 0"
		/>
		<defs>
			<linearGradient
				id="PolicyKillProcess_svg__a"
				x1={10.383}
				x2={13.333}
				y1={21.07}
				y2={35.228}
				gradientUnits="userSpaceOnUse"
			>
				<stop stopColor="#636363" />
				<stop offset={1} stopColor="#444" />
			</linearGradient>
			<linearGradient
				id="PolicyKillProcess_svg__b"
				x1={11.333}
				x2={22.165}
				y1={23.749}
				y2={23.749}
				gradientUnits="userSpaceOnUse"
			>
				<stop stopColor="#636363" />
				<stop offset={0.998} stopColor="#3B3B3B" />
			</linearGradient>
		</defs>
	</svg>
);
const ForwardRef = forwardRef(SvgPolicyKillProcess);
const Memo = memo(ForwardRef);
export default Memo;
