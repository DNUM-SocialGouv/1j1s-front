import classNames from 'classnames';

import { SvgProps } from '~/client/components/ui/Icon/svgProps.type';

export function MailIcon({ color='currentColor', className, ...rest }: SvgProps) {
  return (
    <svg className={classNames(className)} width="15" height="20" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <path fillRule="evenodd" clipRule="evenodd" d="M1 0H19C19.5523 0 20 0.447715 20 1V17C20 17.5523 19.5523 18 19 18H1C0.447715 18 0 17.5523 0 17V1C0 0.447715 0.447715 0 1 0ZM18 4.238L10.072 11.338L2 4.216V16H18V4.238ZM2.511 2L10.061 8.662L17.502 2H2.511Z" fill={color}/>
    </svg>
  );
}
