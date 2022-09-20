import classNames from 'classnames';
import React from 'react';

import { CommonProps } from '~/client/components/props';
import styles from '~/client/components/ui/TextIcon/TextIcon.module.scss';

interface TextIconProps extends CommonProps{
  text: string
  icon: React.ReactNode
}
export const TextIcon = ({ text, icon, className }: TextIconProps) => {
  const _classNames = classNames(styles.textIcon, className);
  return (
    <span className={_classNames}>
      {text} {icon}
    </span>
  );
};
