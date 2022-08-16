import classNames from 'classnames';

import styles from '~/client/components/ui/Icon/icon.module.scss';
import { SvgProps } from '~/client/components/ui/Icon/svgProps.type';

export function AngleRightIcon({ color = 'currentColor', className }: SvgProps) {
  return (
    <svg className={classNames(className, styles.size)} viewBox="0 0 16 16" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M8.78047 7.99999L5.48047 4.69999L6.42314 3.75732L10.6658 7.99999L6.42314 12.2427L5.48047 11.3L8.78047 7.99999Z" fill="#161616"/>
    </svg>
  );
}
