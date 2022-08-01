import { SvgProps } from '~/client/components/ui/Icon/svgProps.type';

export function MenuIcon({ color = 'currentColor', className }: SvgProps) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M2 2.6665H14V3.99984H2V2.6665ZM2 7.33317H10V8.6665H2V7.33317ZM2 11.9998H14V13.3332H2V11.9998Z" />
    </svg>
  );
}
