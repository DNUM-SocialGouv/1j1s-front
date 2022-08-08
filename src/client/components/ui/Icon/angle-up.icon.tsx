import classNames from 'classnames';

import styles from '~/client/components/ui/Icon/icon.module.scss';
import { SvgProps } from '~/client/components/ui/Icon/svgProps.type';

export function AngleUpIcon({ color = 'currentColor', className }: SvgProps) {
  return (
    <svg className={classNames(className, styles.size)}  viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 10.8281L7.04999 15.7781L5.63599 14.3641L12 8.00008L18.364 14.3641L16.95 15.7781L12 10.8281Z" />
    </svg>
  );
}
