import type { SVGProps } from "react";
import { type Ref, forwardRef, memo } from "react";
const SvgScheduleTask = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
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
			fill="#041E42"
			d="m3 12-.951-1a10 10 0 0 1 8.928-8.948L12 3l1-.951a10.005 10.005 0 0 1 8.95 8.95L21 12l.95 1A10.005 10.005 0 0 1 13 21.952L12 21l-1 .95A10.005 10.005 0 0 1 2.049 13z"
		/>
		<path fill="#FDFDFD" d="M12 5a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
		<path
			fill="#0530AD"
			d="M12 14a1 1 0 0 1-.707-.293l-3-3a.999.999 0 1 1 1.414-1.414L12 11.586l8.293-8.293a.999.999 0 1 1 1.414 1.414l-9 9A1 1 0 0 1 12 14"
		/>
		<path
			fill="#FDFDFD"
			d="M13 2.05V4h-2V2.05c.33-.03.66-.05 1-.05s.67.02 1 .05M4 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2"
		/>
		<path
			fill="#FDFDFD"
			d="M2.05 11H4v2H2.05c-.03-.33-.05-.66-.05-1s.02-.67.05-1M12 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2"
		/>
		<path
			fill="#FDFDFD"
			d="M11 21.95V20h2v1.95c-.33.03-.66.05-1 .05s-.67-.02-1-.05M20 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2"
		/>
		<path fill="#FDFDFD" d="M21.95 13H20v-2h1.95c.03.33.05.66.05 1s-.02.67-.05 1" />
	</svg>
);
const ForwardRef = forwardRef(SvgScheduleTask);
const Memo = memo(ForwardRef);
export default Memo;
