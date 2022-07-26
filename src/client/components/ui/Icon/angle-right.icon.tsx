import { SvgProps } from '~/client/components/ui/Icon/svgProps.type';

export function AngleRightIcon({ color = 'currentColor', className }: SvgProps) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 16 17" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M8.78145 8.01464L5.48145 4.71464L6.42411 3.77197L10.6668 8.01464L6.42411 12.2573L5.48145 11.3146L8.78145 8.01464Z" />
    </svg>
  );
}
