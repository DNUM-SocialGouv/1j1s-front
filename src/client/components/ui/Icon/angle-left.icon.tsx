import classNames from 'classnames';

import styles from '~/client/components/ui/Icon/icon.module.scss';
import { SvgProps } from '~/client/components/ui/Icon/svgProps.type';

export function AngleLeftIcon({ color = 'currentColor', className, isDecorative = true }: SvgProps) {
  return (
    <svg  width="16" height="16" className={classNames(className, styles.size)}  viewBox="0 0 16 16" fill={color} xmlns="http://www.w3.org/2000/svg" aria-hidden={isDecorative}>
      <path fillRule="evenodd" clipRule="evenodd" d="M7.21932 7.99999L10.5193 11.3L9.57665 12.2427L5.33398 7.99999L9.57665 3.75732L10.5193 4.69999L7.21932 7.99999Z" />
    </svg>
  );
}
