import * as React from "react";
import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgMtnaota = (
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
		<path fill="#FFBE00" d="M2 2h20v20H2z" />
		<path
			fill="#005C87"
			d="M12 18.165c5.318 0 9.63-2.637 9.63-5.89s-4.312-5.89-9.63-5.89-9.63 2.637-9.63 5.89 4.312 5.89 9.63 5.89"
		/>
		<path
			fill="#fff"
			d="m18.186 14.111.034-.888h-.945l-.277.888h-1.08l1.453-4.071h1.867l.022 4.071zm-.232-3.082-.447 1.437h.74l.063-1.437zM16.593 10.922h-1.391l-.56 3.19h-1.024l.56-3.19h-1.397l.159-.882h3.811zM11.033 10q1.363 0 1.363 1.114 0 .186-.04.402l-.198 1.13q-.135.787-.588 1.165-.452.38-1.272.38t-1.143-.38q-.22-.26-.22-.718 0-.203.045-.446l.198-1.131Q9.444 10 11.033 10m-.582 3.314q.282 0 .452-.147.17-.148.237-.543l.193-1.086q.017-.113.017-.203 0-.459-.464-.459-.582.012-.696.662l-.192 1.086a2 2 0 0 0-.023.294q0 .396.476.396M7.268 14.111l.034-.888h-.945l-.277.888H5l1.453-4.071H8.32l.022 4.071zm-.232-3.082-.447 1.437h.74l.063-1.437z"
		/>
	</svg>
);
const ForwardRef = forwardRef(SvgMtnaota);
const Memo = memo(ForwardRef);
export default Memo;
