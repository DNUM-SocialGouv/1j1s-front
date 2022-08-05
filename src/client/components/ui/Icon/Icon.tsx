import { useMemo } from 'react';

import { CommonProps } from '~/client/components/props';
import { AngleDownIcon } from '~/client/components/ui/Icon/angle-down.icon';
import { AngleLeftIcon } from '~/client/components/ui/Icon/angle-left.icon';
import { AngleLeftFromLineIcon } from '~/client/components/ui/Icon/angle-left-from-line.icon';
import { AngleRightIcon } from '~/client/components/ui/Icon/angle-right.icon';
import { AngleRightFromLineIcon } from '~/client/components/ui/Icon/angle-right-from-line.icon';
import { AngleUpIcon } from '~/client/components/ui/Icon/angle-up.icon';
import { ArrowRightIcon } from '~/client/components/ui/Icon/arrow-right.icon';
import { BurgerMenuIcon } from '~/client/components/ui/Icon/burger-menu.icon';
import { BurgerMenuLeftIcon } from '~/client/components/ui/Icon/burger-menu-left.icon';
import { CloseIcon } from '~/client/components/ui/Icon/close.icon';
import { ErrorIcon } from '~/client/components/ui/Icon/error.icon';
import { ExternalRedirectionIcon } from '~/client/components/ui/Icon/external-redirection.icon';
import { FilterIcon } from '~/client/components/ui/Icon/filter.icon';
import { HomeIcon } from '~/client/components/ui/Icon/home.icon';
import { InformationIcon } from '~/client/components/ui/Icon/information.icon';
import { MagnifyingGlassIcon } from '~/client/components/ui/Icon/magnifying-glass.icon';
import { MenuIcon } from '~/client/components/ui/Icon/menu.icon';

type IconName =
  'angle-down'
  | 'angle-left'
  | 'angle-left-from-line'
  | 'angle-right'
  | 'angle-right-from-line'
  | 'angle-up'
  | 'arrow-right'
  | 'burger-menu'
  | 'burger-menu-left'
  | 'close'
  | 'error'
  | 'external-redirection'
  | 'filter'
  | 'home'
  | 'information'
  | 'magnifying-glass'
  | 'menu'

interface IconProps extends CommonProps {
  name: IconName
}

export function Icon({ name, className }: IconProps) {

  const getIcon = useMemo(() => {
    switch (name) {
      case 'angle-down':
        return <AngleDownIcon className={className}/>;
      case 'angle-left':
        return <AngleLeftIcon className={className}/>;
      case 'angle-left-from-line':
        return <AngleLeftFromLineIcon className={className}/>;
      case 'angle-right':
        return <AngleRightIcon className={className}/>;
      case 'angle-right-from-line':
        return <AngleRightFromLineIcon className={className}/>;
      case 'angle-up':
        return <AngleUpIcon className={className}/>;
      case 'arrow-right':
        return <ArrowRightIcon className={className}/>;
      case 'burger-menu':
        return <BurgerMenuIcon className={className}/>;
      case 'burger-menu-left':
        return <BurgerMenuLeftIcon className={className}/>;
      case 'close':
        return <CloseIcon className={className}/>;
      case 'error':
        return <ErrorIcon className={className}/>;
      case 'external-redirection':
        return <ExternalRedirectionIcon className={className}/>;
      case 'filter':
        return <FilterIcon className={className}/>;
      case 'home':
        return <HomeIcon className={className}/>;
      case 'information':
        return <InformationIcon className={className}/>;
      case 'magnifying-glass':
        return <MagnifyingGlassIcon className={className}/>;
      case 'menu':
        return <MenuIcon className={className}/>;
      default:
        return null;
    }
  }, [name, className]);

  return ( getIcon );
}
