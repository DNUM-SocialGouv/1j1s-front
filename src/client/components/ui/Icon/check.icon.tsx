import classNames from 'classnames';

import { SvgProps } from '~/client/components/ui/Icon/svgProps.type';

import styles from './check.icon.module.css';

export function CheckIcon({ circled= false, color = 'currentColor', className }: SvgProps & { circled?: boolean }) {
  return (
    <svg className={classNames(className, circled ? styles.circled : styles.uncircled)} stroke={color} fill={color} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
      <circle cx="24" cy="24" r="20" stroke={color} fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2"/>
      <path className={styles.path} fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="6.7" d="M4 23.9 l13.4 13.4 L44 10.7" />
    </svg>
  );
}
