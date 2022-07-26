import { SvgProps } from '~/client/components/ui/Icon/svgProps.type';

export function AngleLeftIcon({ color = 'currentColor', className }: SvgProps) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 16 17" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M7.21883 8.01464L10.5188 11.3146L9.57616 12.2573L5.3335 8.01464L9.57616 3.77197L10.5188 4.71464L7.21883 8.01464Z" />
    </svg>
  );
}
