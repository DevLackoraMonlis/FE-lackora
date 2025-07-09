import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgCIconAdapterAzure = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		fill="none"
		viewBox="0 0 32 26"
		ref={ref}
		{...props}
	>
		<path
			fill="#0089D6"
			d="M14.804 24.025c4.111-.726 7.507-1.327 7.546-1.336l.07-.015-3.88-4.617a654 654 0 0 1-3.882-4.638c0-.023 4.008-11.06 4.03-11.1.008-.012 2.735 4.697 6.612 11.416l6.65 11.525.05.088-12.335-.001-12.336-.002zM0 22.617c0-.007 1.829-3.181 4.064-7.055L8.13 8.518l4.736-3.975a1797 1797 0 0 1 4.752-3.98.8.8 0 0 1-.076.191l-5.143 11.032-5.052 10.833-3.673.005c-2.02.003-3.673 0-3.673-.007"
		/>
	</svg>
);
const ForwardRef = forwardRef(SvgCIconAdapterAzure);
const Memo = memo(ForwardRef);
export default Memo;
