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
  isDecorative?: boolean
}

export function Icon({ name, className, isDecorative }: IconProps) {

  const getIcon = useMemo(() => {
    switch (name) {
      case 'angle-down':
        return <AngleDownIcon className={className} isDecorative={isDecorative} />;
      case 'angle-left':
        return <AngleLeftIcon className={className} isDecorative={isDecorative} />;
      case 'angle-left-from-line':
        return <AngleLeftFromLineIcon className={className} isDecorative={isDecorative} />;
      case 'angle-right':
        return <AngleRightIcon className={className} isDecorative={isDecorative} />;
      case 'angle-right-from-line':
        return <AngleRightFromLineIcon className={className} isDecorative={isDecorative} />;
      case 'angle-up':
        return <AngleUpIcon className={className} isDecorative={isDecorative} />;
      case 'arrow-right':
        return <ArrowRightIcon className={className} isDecorative={isDecorative} />;
      case 'burger-menu':
        return <BurgerMenuIcon className={className} isDecorative={isDecorative} />;
      case 'burger-menu-left':
        return <BurgerMenuLeftIcon className={className} isDecorative={isDecorative} />;
      case 'close':
        return <CloseIcon className={className} isDecorative={isDecorative} />;
      case 'error':
        return <ErrorIcon className={className} isDecorative={isDecorative} />;
      case 'external-redirection':
        return <ExternalRedirectionIcon className={className} isDecorative={isDecorative} />;
      case 'filter':
        return <FilterIcon className={className} isDecorative={isDecorative} />;
      case 'home':
        return <HomeIcon className={className} isDecorative={isDecorative} />;
      case 'information':
        return <InformationIcon className={className} isDecorative={isDecorative} />;
      case 'magnifying-glass':
        return <MagnifyingGlassIcon className={className} isDecorative={isDecorative} />;
      case 'menu':
        return <MenuIcon className={className} isDecorative={isDecorative} />;
      default:
        return null;
    }
  }, [name, className, isDecorative]);

  return ( getIcon );
}
