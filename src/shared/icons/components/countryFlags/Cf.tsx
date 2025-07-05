import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgCf = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 8" width="1em" height="1em" ref={ref} {...props}>
		<path fill="#fff" d="M0 0h12v8H0z" />
		<path fill="#003082" d="M0 0h12v2H0z" />
		<path fill="#289728" d="M0 4h12v4H0z" />
		<path fill="#ffce00" d="M0 6h12v2H0zM2 .187l.529 1.626L1.145.808h1.71L1.471 1.813z" />
		<path fill="#d21034" d="M5 0h2v8H5z" />
	</svg>
);
const ForwardRef = forwardRef(SvgCf);
const Memo = memo(ForwardRef);
export default Memo;
