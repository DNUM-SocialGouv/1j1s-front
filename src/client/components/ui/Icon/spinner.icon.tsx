import classNames from 'classnames';

import styles from '~/client/components/ui/Icon/icon.module.scss';
import { SvgProps } from '~/client/components/ui/Icon/svgProps.type';

export function SpinnerIcon({ color = 'currentColor', className }: SvgProps) {
  return (
    <svg width="100" height="100" className={classNames(className, styles.size)} viewBox="0 0 100 100" stroke={color} fill={color} xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="30" strokeWidth="10" strokeDasharray="47.12388980384689 47.12388980384689" fill="none" strokeLinecap="round">
        <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" keyTimes="0;1" values="0 50 50;360 50 50"></animateTransform>
      </circle>
    </svg>
  );
}
