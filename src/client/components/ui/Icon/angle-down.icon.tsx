import { SvgProps } from '~/client/components/ui/Icon/svgProps.type';

export function AngleDownIcon({ color = '#161616' }: SvgProps) {
  return (
    <svg width="24" height="25" viewBox="0 0 24 25" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 13.5797L16.95 8.62971L18.364 10.0437L12 16.4077L5.63599 10.0437L7.04999 8.62971L12 13.5797Z" />
    </svg>
  );
}
