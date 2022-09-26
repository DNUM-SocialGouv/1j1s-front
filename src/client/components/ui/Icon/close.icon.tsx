import classNames from 'classnames';

import styles from '~/client/components/ui/Icon/icon.module.scss';
import { SvgProps } from '~/client/components/ui/Icon/svgProps.type';

export function CloseIcon({ color = 'currentColor', className, isDecorative = true }: SvgProps) {
  return (
    <svg width="16" height="16" className={classNames(className, styles.size)} viewBox="0 0 16 16" fill={color} xmlns="http://www.w3.org/2000/svg" aria-hidden={isDecorative}>
      <path fillRule="evenodd" clipRule="evenodd" d="M7.99999 7.05684L11.3 3.75684L12.2427 4.6995L8.94266 7.9995L12.2427 11.2995L11.3 12.2422L7.99999 8.94217L4.69999 12.2422L3.75732 11.2995L7.05732 7.9995L3.75732 4.6995L4.69999 3.75684L7.99999 7.05684Z" />
    </svg>
  );
}
