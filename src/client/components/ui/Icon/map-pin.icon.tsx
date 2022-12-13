import classNames from 'classnames';

import styles from '~/client/components/ui/Icon/icon.module.scss';
import { SvgProps } from '~/client/components/ui/Icon/svgProps.type';

export function MapPinIcon({ color = 'currentColor', className, ...rest }: SvgProps) {
  return (
    <svg width="16" height="16" className={classNames(className, styles.size)} viewBox="0 0 16 16" fill={color} xmlns="http://www.w3.org/2000/svg" {...rest}>
      <g clipPath="url(#clip0_8654_64098)">
        <path d="M12.2427 12.0766L8 16.3193L3.75734 12.0766C2.91823 11.2375 2.34679 10.1684 2.11529 9.0045C1.88378 7.84061 2.0026 6.63422 2.45673 5.53787C2.91086 4.44151 3.6799 3.50445 4.66659 2.84516C5.65328 2.18588 6.81332 1.83398 8 1.83398C9.18669 1.83398 10.3467 2.18588 11.3334 2.84516C12.3201 3.50445 13.0891 4.44151 13.5433 5.53787C13.9974 6.63422 14.1162 7.84061 13.8847 9.0045C13.6532 10.1684 13.0818 11.2375 12.2427 12.0766ZM8 9.16726C8.35362 9.16726 8.69276 9.02679 8.94281 8.77674C9.19286 8.52669 9.33334 8.18755 9.33334 7.83393C9.33334 7.48031 9.19286 7.14117 8.94281 6.89112C8.69276 6.64107 8.35362 6.5006 8 6.5006C7.64638 6.5006 7.30724 6.64107 7.05719 6.89112C6.80715 7.14117 6.66667 7.48031 6.66667 7.83393C6.66667 8.18755 6.80715 8.52669 7.05719 8.77674C7.30724 9.02679 7.64638 9.16726 8 9.16726Z" fill="#3A3A3A"/>
      </g>
      <defs>
        <clipPath id="clip0_8654_64098">
          <rect width="16" height="16" fill="white" transform="translate(0 0.5)"/>
        </clipPath>
      </defs>
    </svg>
  );
}

