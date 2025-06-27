import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef, memo } from "react";
const SvgMonoWatchLogo = (
  props: SVGProps<SVGSVGElement>,
  ref: Ref<SVGSVGElement>
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 56 55"
    ref={ref}
    {...props}
  >
    <path
      fill="#E9ECEF"
      d="M.8 16c0-8.837 7.163-16 16-16H52a3.2 3.2 0 0 1 3.2 3.2v35.2c0 8.837-7.163 16-16 16H16.8c-8.837 0-16-7.163-16-16z"
    />
    <circle cx={28} cy={27.2} r={15.438} fill="#211F31" />
  </svg>
);
const ForwardRef = forwardRef(SvgMonoWatchLogo);
const Memo = memo(ForwardRef);
export default Memo;
