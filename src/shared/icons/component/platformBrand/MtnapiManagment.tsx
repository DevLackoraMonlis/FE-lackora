import * as React from 'react';
import type { SVGProps } from 'react';
import { Ref, forwardRef, memo } from 'react';
const SvgMtnapiManagment = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 241 240" ref={ref} {...props}>
    <path fill="#FFBE00" d="M20 20h200v200H20z" />
    <path
      fill="#005C87"
      d="M120.001 181.652c53.181 0 96.293-26.372 96.293-58.903s-43.112-58.904-96.293-58.904-96.294 26.372-96.294 58.904c0 32.531 43.112 58.903 96.294 58.903"
    />
    <path
      fill="#fff"
      d="m65.802 150 .386-10.903H55.444L52.29 150H40l16.537-50H77.77l.257 50zm-2.638-37.847-5.083 17.639h8.43l.707-17.639zM105.865 134.792h-7.657L95.698 150H84.118l8.172-50h19.625q7.27 0 10.359 3.611 2.253 2.778 2.253 7.083 0 1.459-.258 3.056l-1.287 7.847q-.965 5.764-5.662 9.514-4.697 3.681-11.454 3.681m1.995-23.959h-5.791l-2.123 13.125h5.726q5.277 0 6.113-5.069l.451-2.847q.128-.626.128-1.667t-.965-2.292q-.965-1.25-3.539-1.25M144.903 100l-8.107 50h-11.647l8.172-50zM166.154 100l6.885 23.958 14.8-23.958H200l-8.172 50h-11.646l4.633-28.194-9.91 16.805h-8.429l-4.375-16.805L157.468 150h-11.582l8.171-50z"
    />
  </svg>
);
const ForwardRef = forwardRef(SvgMtnapiManagment);
const Memo = memo(ForwardRef);
export default Memo;
