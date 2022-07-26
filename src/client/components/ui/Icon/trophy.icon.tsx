import { SvgProps } from '~/client/components/ui/Icon/svgProps.type';

export function TrophyIcon({ color = 'currentColor', className }: SvgProps) {
  return (
    <svg className={className} width="52" height="52" viewBox="0 0 52 52" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M28.1667 36.699V41.1667H39V45.5H13V41.1667H23.8333V36.699C15.1665 35.6061 8.66666 28.2354 8.66666 19.5V6.5H43.3333V19.5C43.3333 28.2354 36.8335 35.6061 28.1667 36.699ZM2.16666 10.8333H6.49999V19.5H2.16666V10.8333ZM45.5 10.8333H49.8333V19.5H45.5V10.8333Z" />
    </svg>
  );
}
