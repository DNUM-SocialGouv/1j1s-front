import classNames from 'classnames';

import styles from '~/client/components/ui/Icon/icon.module.scss';
import { SvgProps } from '~/client/components/ui/Icon/svgProps.type';

export function AngleUpIcon({ color = 'currentColor', className, ...rest }: SvgProps) {
  return (
    <svg width="24" height="24" className={classNames(className, styles.size)}  viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg" {...rest}>
      <path fillRule="evenodd" clipRule="evenodd" d="M12 10.8281L7.04999 15.7781L5.63599 14.3641L12 8.00008L18.364 14.3641L16.95 15.7781L12 10.8281Z" />
    </svg>
  );
}
