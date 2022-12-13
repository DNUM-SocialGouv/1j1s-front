import classNames from 'classnames';
import React from 'react';

import { CommonProps } from '~/client/components/props';
import styles from '~/client/components/ui/TextIcon/TextIcon.module.scss';

interface TextIconProps extends CommonProps{
  text: string
  icon: React.ReactNode
  iconPosition?: 'right' | 'left'
}
export const TextIcon = ({ text, icon, className, iconPosition='right' }: TextIconProps) => {
  const _classNames = classNames(styles.textIcon, iconPosition === 'right' ? styles.spaceForRightIcon : styles.spaceForLeftIcon, className);

  return (
    <span className={_classNames}>
      { iconPosition === 'left' ? <>{icon} {text}</> : <>{text} {icon}</>
      }
    </span>
  );
};

