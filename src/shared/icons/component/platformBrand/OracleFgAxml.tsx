import * as React from 'react';
import type { SVGProps } from 'react';
import { Ref, forwardRef, memo } from 'react';
const SvgOracleFgAxml = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 241 240" ref={ref} {...props}>
    <path
      fill="red"
      fillRule="evenodd"
      d="M79.867 189.124c-38.406 0-69.573-31.089-69.573-69.507C10.294 81.2 41.46 50 79.867 50h80.865c38.417 0 69.562 31.2 69.562 69.617s-31.145 69.507-69.562 69.507zm79.066-24.539c24.883 0 45.035-20.096 45.035-44.968 0-24.87-20.152-45.079-45.035-45.079H81.655c-24.872 0-45.036 20.208-45.036 45.079s20.164 44.968 45.036 44.968z"
      clipRule="evenodd"
    />
  </svg>
);
const ForwardRef = forwardRef(SvgOracleFgAxml);
const Memo = memo(ForwardRef);
export default Memo;
