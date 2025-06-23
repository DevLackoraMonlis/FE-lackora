import * as React from "react";
import type { Ref, SVGProps } from "react";
import { forwardRef, memo } from "react";
const SvgCiscoSecureAcs = (
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
		<g clipPath="url(#Cisco_Secure_ACS_svg__a)">
			<path
				fill="#007EBA"
				stroke="#fff"
				strokeWidth={0.4}
				d="m2.316 6.92 2.248-1.747h17.115L19.37 6.92z"
			/>
			<path
				stroke="#fff"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={0.4}
				d="M19.37 18.843H2.317"
			/>
			<path
				fill="#007EBA"
				stroke="#fff"
				strokeWidth={0.4}
				d="M19.436 6.828v12.02H2.25V6.807z"
			/>
			<path
				fill="#007EBA"
				stroke="#fff"
				strokeWidth={0.4}
				d="M21.597 17.01V5.216l-2.205 1.655v11.902z"
			/>
			<path
				fill="#fff"
				d="M17.972 14.263h-2.276v-.34l-1.121.675 1.121.692v-.335h2.276zM6.807 10.43h-2.27v-.336l-1.122.676 1.122.692v-.335h2.27zM15 11.17h2.182v.335l1.122-.676-1.122-.692v.34H15zM3.568 14.971H5.75v.341l1.121-.676-1.121-.692v.335H3.568z"
			/>
			<path
				fill="#fff"
				stroke="#000"
				strokeWidth={0.2}
				d="M5.653 17.756a.417.417 0 0 1 .386-.443.41.41 0 0 1 .441.384.417.417 0 0 1-.386.443.41.41 0 0 1-.441-.384Z"
			/>
			<path
				fill="#fff"
				stroke="#000"
				strokeWidth={0.2}
				d="m7.88 14.868-2.195 2.439.848.753 2.195-2.438z"
			/>
			<path
				fill="#fff"
				stroke="#000"
				strokeWidth={0.2}
				d="M7.291 11.781c-.245 2.098 1.28 3.996 3.392 4.24 2.112.243 4.028-1.271 4.268-3.37.239-2.097-1.28-4-3.392-4.239-2.112-.243-4.028 1.27-4.268 3.369Zm.534.06c.207-1.807 1.856-3.104 3.669-2.899a3.304 3.304 0 0 1 2.918 3.65c-.207 1.806-1.857 3.104-3.67 2.899s-3.124-1.844-2.917-3.645z"
			/>
			<path
				fill="#fff"
				stroke="#000"
				strokeWidth={0.2}
				d="M6.818 11.949c-.24 2.098 1.279 4.001 3.391 4.24 2.112.242 4.028-1.272 4.268-3.37s-1.28-4.001-3.392-4.24c-2.112-.237-4.028 1.271-4.267 3.37Zm.533.06c.207-1.807 1.856-3.105 3.67-2.9 1.817.206 3.124 1.845 2.917 3.645-.207 1.806-1.856 3.104-3.67 2.899-1.812-.206-3.124-1.844-2.917-3.645Z"
			/>
			<path
				fill="#007EBA"
				stroke="#fff"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={0.3}
				d="M9.213 12.251h2.978c.087 0 .157.07.157.157v1.91c0 .086-.07.156-.158.156H9.214a.157.157 0 0 1-.158-.157v-1.909c0-.086.07-.157.158-.157M12.348 12.246l.626-.622H9.681l-.626.622z"
			/>
			<path
				fill="#007EBA"
				stroke="#fff"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={0.3}
				d="M12.974 13.841v-2.217l-.626.622v2.223zM11.037 10.25a.86.86 0 0 0-.86.855v.757c.005.06-.055.124-.142.13-.093.01-.19-.038-.196-.098v-.751c0-.644.528-1.168 1.176-1.168s1.175.524 1.175 1.168v.822c-.005.06-.07.103-.163.097-.081 0-.158-.113-.152-.173v-.79a.84.84 0 0 0-.838-.854z"
			/>
			<path
				fill="#fff"
				d="M10.693 13.555c.147 0 .273-.157.273-.346 0-.19-.12-.346-.273-.346-.152 0-.272.156-.272.346s.12.346.272.346"
			/>
			<path fill="#fff" d="M10.775 13.912v-.682l-.169.125v.675z" />
		</g>
		<defs>
			<clipPath id="Cisco_Secure_ACS_svg__a">
				<path fill="#fff" d="M2 5h20v14H2z" />
			</clipPath>
		</defs>
	</svg>
);
const ForwardRef = forwardRef(SvgCiscoSecureAcs);
const Memo = memo(ForwardRef);
export default Memo;
