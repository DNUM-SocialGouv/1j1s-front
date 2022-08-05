import classNames from 'classnames';

import styles from '~/client/components/ui/Icon/icon.module.scss';
import { SvgProps } from '~/client/components/ui/Icon/svgProps.type';

export function FilterIcon({ color = 'currentColor', className }: SvgProps) {
  return (
    <svg className={classNames(className, styles.size)}  viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path d="M21 3.99951V5.99951H20L14 14.9995V21.9995H10V14.9995L4 5.99951H3V3.99951H21Z" />
    </svg>
  );
}
