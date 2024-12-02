import { JSX } from 'solid-js';

export const IconRight = (props: JSX.SvgSVGAttributes<SVGSVGElement>) => {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1024 1024"
      width={props.width || '16px'}
      height={props.height || '16px'}
      fill={props.fill || 'currentColor'}
      {...props}
    >
      <path d="M765.7 486.8L314.9 134.7c-5.3-4.1-12.9-0.4-12.9 6.3v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1c16.4-12.8 16.4-37.6 0-50.4z"></path>
    </svg>
  );
};
export default IconRight;
