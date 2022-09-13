import classNames from 'classnames';
import React from 'react';

import { CommonProps } from '~/client/components/props';

interface ContainerWrapperProps extends CommonProps {
  hasBottomBorder?: boolean
  isBackgroundWhite?: boolean
}

export function SectionLayout({ children, className, hasBottomBorder = false, isBackgroundWhite = true, ...rest }: React.PropsWithChildren<ContainerWrapperProps>) {
  const _classNames = classNames(hasBottomBorder ? 'separator' : '', isBackgroundWhite ? 'background-white' : 'background-white-lilac', className);

  return (
    <div className={_classNames} {...rest}>
      {children}
    </div>
  );
}
