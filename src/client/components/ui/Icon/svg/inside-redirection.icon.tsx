import { SvgProps } from '~/client/components/ui/Icon/Icon';

export function InsideRedirectionIcon({ color = '#3A3A3A' }: SvgProps) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M6.66667 4.00049V5.33382H3.33333V12.6672H10.6667V9.33382H12V13.3338C12 13.702 11.7015 14.0005 11.3333 14.0005H2.66667C2.29848 14.0005 2 13.702 2 13.3338V4.66716C2 4.29897 2.29848 4.00049 2.66667 4.00049H6.66667ZM14 2.00049V7.33382H12.6667V4.27582L7.47133 9.47182L6.52867 8.52916L11.7233 3.33382H8.66667V2.00049H14Z" />
    </svg>
  );
}
