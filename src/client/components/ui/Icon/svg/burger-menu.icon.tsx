import { SvgProps } from '~/client/components/ui/Icon/Icon';

export function BurgerMenuIcon({ color = '#161616' }: SvgProps) {
  return (
    <svg width="25" height="24" viewBox="0 0 25 24" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M3.5 3.99976H21.5V5.99976H3.5V3.99976ZM3.5 10.9998H21.5V12.9998H3.5V10.9998ZM3.5 17.9998H21.5V19.9998H3.5V17.9998Z" />
    </svg>
  );
}
