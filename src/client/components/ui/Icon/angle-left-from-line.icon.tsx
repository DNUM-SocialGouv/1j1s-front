import classNames from 'classnames';

import styles from '~/client/components/ui/Icon/icon.module.scss';
import { SvgProps } from '~/client/components/ui/Icon/svgProps.type';

export function AngleLeftFromLineIcon({ color = 'currentColor', className }: SvgProps) {
  return (
    <svg className={classNames(className, styles.size)} viewBox="0 0 16 16" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path d="M5.33333 4.01465H4V12.5013H5.33333V4.01465Z" fill={color}/>
      <path d="M11.852 11.5573L8.552 8.25732L11.852 4.95732L10.9093 4.01465L6.66667 8.25732L10.9093 12.5L11.852 11.5573Z" />
    </svg>
  );
}
