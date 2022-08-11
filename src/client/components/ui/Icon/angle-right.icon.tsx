import classNames from 'classnames';

import styles from '~/client/components/ui/Icon/icon.module.scss';
import { SvgProps } from '~/client/components/ui/Icon/svgProps.type';

export function AngleRightIcon({ color = 'currentColor', className }: SvgProps) {
  return (
    <svg className={classNames(className, styles.size)} viewBox="0 0 24 25" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M13.1722 12.0139L8.22217 7.0639L9.63617 5.6499L16.0002 12.0139L9.63617 18.3779L8.22217 16.9639L13.1722 12.0139Z" />
    </svg>
  );
}
