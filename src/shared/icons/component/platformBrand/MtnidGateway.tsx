import * as React from "react";
import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgMtnidGateway = (
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
			d="M15.086 15.098q-.994 0-1.372-.462-.259-.322-.259-.882 0-.26.056-.567l.245-1.4q.33-1.875 2.296-1.876.813 0 1.232.35.42.343.42.945 0 .245-.07.497a2 2 0 0 1-.126.378l-.07.126H16.2a.97.97 0 0 0 .182-.581q0-.63-.525-.63-.706 0-.847.819l-.238 1.344q-.035.19-.035.371 0 .483.567.483.574 0 .735-.574h-.574l.14-.777h1.855l-.112.602-.035.203q-.294 1.63-2.226 1.631M11.496 9.96q.916 0 1.309.462.287.35.287.875 0 .189-.035.399l-.273 1.561q-.14.791-.686 1.267-.547.476-1.414.476H8.647l.889-5.04zm-.441 1.092H10.6l-.497 2.856h.665q.33 0 .51-.175.19-.181.26-.588l.203-1.148q.027-.154.028-.28 0-.665-.714-.665M8.54 9.96 7.658 15H6.39l.889-5.04z"
		/>
	</svg>
);
const ForwardRef = forwardRef(SvgMtnidGateway);
const Memo = memo(ForwardRef);
export default Memo;
