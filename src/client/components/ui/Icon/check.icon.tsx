import classNames from 'classnames';

import { SvgProps } from '~/client/components/ui/Icon/svgProps.type';

import styles from './check.icon.module.css';

export function CheckIcon({ animate = false, circled= false, color = 'currentColor', className }: SvgProps & { circled?: boolean, animate?: boolean }) {
  const svgStyles = [className];
  svgStyles.push(circled ? styles.circled : styles.uncircled);
  if (animate) {
    svgStyles.push(styles.animate);
  }
  return (
    <div className={classNames(svgStyles)}>
      <svg stroke={color} fill={color} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
        <path className={styles.circle}  fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M 47,24 A 23,23 0 0 1 24,47 23,23 0 0 1 1,24 23,23 0 0 1 24,1 23,23 0 0 1 47,24 Z" />
        <path className={styles.check}  fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="6.7" d="M4 23.9 l13.4 13.4 L44 10.7" />
      </svg>
      <span className={styles.ripple}></span>
    </div>
  );
}
