import classNames from 'classnames';
import React, { useMemo } from 'react';

import {
  Color,
  CommonProps,
} from '~/client/components/props';

interface ContainerWrapperProps extends CommonProps {
  hasBottomBorder?: boolean
  backgroundColor?: 'white' | 'white-lilac' | 'primary' | 'gradient-to-primary'
}

export function SectionLayout({ children, className, hasBottomBorder = false, backgroundColor, ...rest }: React.PropsWithChildren<ContainerWrapperProps>) {
  const getBackgroundColor = useMemo(() => {
    switch (backgroundColor) {
      case Color.WHITE_LILAC:
        return 'background-white-lilac';
      case Color.PRIMARY:
        return 'background-primary';
      case Color.GRADIENT_TO_PRIMARY:
        return 'background-gradient-to-primary';
      default:
        return 'background-white';
    }
  }, [backgroundColor]);
  const _classNames = classNames(hasBottomBorder ? 'separator' : '', getBackgroundColor, className);

  return (
    <div className={_classNames} {...rest}>
      {children}
    </div>
  );
}
