import classNames from 'classnames';

import styles from '~/client/components/ui/Icon/icon.module.scss';
import { SvgProps } from '~/client/components/ui/Icon/svgProps.type';

export function HomeIcon({ color = 'currentColor', className }: SvgProps) {
  return (
    <svg className={classNames(className, styles.size)} viewBox="0 0 16 16" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path d="M12.667 13.9998H3.33366C3.15685 13.9998 2.98728 13.9295 2.86225 13.8045C2.73723 13.6795 2.66699 13.5099 2.66699 13.3331V7.33312H0.666992L7.55166 1.07445C7.6744 0.962769 7.83438 0.900879 8.00033 0.900879C8.16627 0.900879 8.32625 0.962769 8.44899 1.07445L15.3337 7.33312H13.3337V13.3331C13.3337 13.5099 13.2634 13.6795 13.1384 13.8045C13.0134 13.9295 12.8438 13.9998 12.667 13.9998ZM8.66699 12.6664H12.0003V6.10445L8.00033 2.46845L4.00033 6.10445V12.6664H7.33366V8.66645H8.66699V12.6664Z" />
    </svg>
  );
}
