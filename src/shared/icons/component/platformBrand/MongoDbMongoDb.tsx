import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgMongoDbMongoDb = (
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
		<path
			fill="#13AA52"
			d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10"
		/>
		<path
			fill="#fff"
			d="M14.673 10.778c-.632-2.788-2.124-3.704-2.285-4.054-.176-.247-.354-.687-.354-.687l-.013-.033c-.018.247-.028.342-.261.592-.362.282-2.218 1.84-2.369 5.007-.14 2.954 2.134 4.714 2.442 4.938l.035.025v-.002c.002.015.097.703.165 1.432h.24q.086-.773.254-1.533l.02-.013q.206-.148.393-.322l.014-.012a5.67 5.67 0 0 0 1.818-4.23 7 7 0 0 0-.099-1.108m-2.666 4.095s0-4.142.137-4.142c.106 0 .244 5.344.244 5.344-.19-.023-.381-.88-.381-1.202"
		/>
	</svg>
);
const ForwardRef = forwardRef(SvgMongoDbMongoDb);
const Memo = memo(ForwardRef);
export default Memo;
