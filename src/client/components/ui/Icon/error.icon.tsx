import classNames from 'classnames';

import styles from '~/client/components/ui/Icon/icon.module.scss';
import { SvgProps } from '~/client/components/ui/Icon/svgProps.type';

export function ErrorIcon({ color = 'currentColor', className, ...rest }: SvgProps) {
  return (
    <svg width="16" height="16" className={classNames(className, styles.size)} viewBox="0 0 16 16" fill={color} xmlns="http://www.w3.org/2000/svg" {...rest}>
      <path fillRule="evenodd" clipRule="evenodd" d="M15.3332 7.99953L11.6665 1.6662H4.33317L0.666504 7.99953L4.33317 14.3329H11.6665L15.3332 7.99953ZM9.88522 5.17084L7.99989 7.05684L6.11456 5.17084L5.17122 6.11417L7.05722 7.9995L5.17122 9.88484L6.11456 10.8282L7.99989 8.94217L9.88522 10.8282L10.8286 9.88484L8.94256 7.9995L10.8286 6.11417L9.88522 5.17084Z" />
    </svg>
  );
}
