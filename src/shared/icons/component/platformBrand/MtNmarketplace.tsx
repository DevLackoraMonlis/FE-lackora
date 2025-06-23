import * as React from "react";
import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgMtNmarketplace = (
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
			d="M15.265 13.467h-.833L14.159 15h-1.26l.889-5.04h2.135q.79 0 1.127.364.245.28.245.714 0 .146-.028.308l-.14.791q-.105.58-.616.959-.511.37-1.246.371m.217-2.415h-.63l-.231 1.323h.623q.573 0 .665-.511l.049-.287a1 1 0 0 0 .014-.168q0-.105-.105-.231-.106-.126-.385-.126M9.109 9.96l.749 2.415 1.61-2.415h1.323L11.9 15h-1.266l.504-2.842-1.078 1.694h-.917l-.476-1.694L8.164 15h-1.26l.889-5.04z"
		/>
	</svg>
);
const ForwardRef = forwardRef(SvgMtNmarketplace);
const Memo = memo(ForwardRef);
export default Memo;
