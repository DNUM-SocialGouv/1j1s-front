import { useMemo } from 'react';

import { AngleRightIcon } from '~/client/components/ui/Icon/angle-right.icon';
import { ArrowRightIcon } from '~/client/components/ui/Icon/arrow-right.icon';
import { CloseIcon } from '~/client/components/ui/Icon/close.icon';
import { FilterIcon } from '~/client/components/ui/Icon/filter.icon';
import { MagnifyingGlassIcon } from '~/client/components/ui/Icon/magnifying-glass.icon';
import { MenuIcon } from '~/client/components/ui/Icon/menu.icon';

type IconName =
  'close'
  | 'magnifying-glass'
  | 'filter'
  | 'arrow-right'
  | 'angle-right'
  | 'menu'

interface IconProps {
  name: IconName
}

export function Icon({ name }: IconProps) {

  const getIcon = useMemo(() => {
    switch (name) {
      case 'close':
        return <CloseIcon />;
      case 'magnifying-glass':
        return <MagnifyingGlassIcon />;
      case 'filter':
        return <FilterIcon />;
      case 'arrow-right':
        return <ArrowRightIcon />;
      case 'angle-right':
        return <AngleRightIcon />;
      case 'menu':
        return <MenuIcon />;
      default:
        return null;
    }
  }, [name]);

  return ( getIcon );
}
