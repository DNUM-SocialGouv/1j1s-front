import { SvgProps } from '~/client/components/ui/Icon/svgProps.type';

export function AngleDownIcon({ color = '#161616' }: SvgProps) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M8 8.78132L11.3 5.48132L12.2427 6.42399L8 10.6667L3.75733 6.42399L4.7 5.48132L8 8.78132Z" />
    </svg>
  );
}
