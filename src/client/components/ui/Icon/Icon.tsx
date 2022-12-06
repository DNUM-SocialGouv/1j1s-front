import { useMemo } from 'react';

import { CommonProps } from '~/client/components/props';
import { AngleDownIcon } from '~/client/components/ui/Icon/angle-down.icon';
import { AngleLeftIcon } from '~/client/components/ui/Icon/angle-left.icon';
import { AngleLeftFromLineIcon } from '~/client/components/ui/Icon/angle-left-from-line.icon';
import { AngleRightIcon } from '~/client/components/ui/Icon/angle-right.icon';
import { AngleRightFromLineIcon } from '~/client/components/ui/Icon/angle-right-from-line.icon';
import { AngleUpIcon } from '~/client/components/ui/Icon/angle-up.icon';
import { ArrowRightIcon } from '~/client/components/ui/Icon/arrow-right.icon';
import { BookIcon } from '~/client/components/ui/Icon/book.icon';
import { BriefCaseIcon } from '~/client/components/ui/Icon/brief-case.icon';
import { BurgerMenuIcon } from '~/client/components/ui/Icon/burger-menu.icon';
import { BurgerMenuLeftIcon } from '~/client/components/ui/Icon/burger-menu-left.icon';
import { CloseIcon } from '~/client/components/ui/Icon/close.icon';
import { CompassIcon } from '~/client/components/ui/Icon/compass.icon';
import { ErrorIcon } from '~/client/components/ui/Icon/error.icon';
import { ExternalRedirectionIcon } from '~/client/components/ui/Icon/external-redirection.icon';
import { FilterIcon } from '~/client/components/ui/Icon/filter.icon';
import { HomeIcon } from '~/client/components/ui/Icon/home.icon';
import { InformationIcon } from '~/client/components/ui/Icon/information.icon';
import { MagnifyingGlassIcon } from '~/client/components/ui/Icon/magnifying-glass.icon';
import { MailIcon } from '~/client/components/ui/Icon/mail.icon';
import { MapPinIcon } from '~/client/components/ui/Icon/map-pin.icon';
import { MenuIcon } from '~/client/components/ui/Icon/menu.icon';
import { TrophyIcon } from '~/client/components/ui/Icon/trophy.icon';

type IconName =
  'angle-down'
  | 'angle-left'
  | 'angle-left-from-line'
  | 'angle-right'
  | 'angle-right-from-line'
  | 'angle-up'
  | 'arrow-right'
  | 'book'
  | 'brief-case'
  | 'burger-menu'
  | 'burger-menu-left'
  | 'close'
  | 'compass'
  | 'error'
  | 'external-redirection'
  | 'filter'
  | 'home'
  | 'information'
  | 'magnifying-glass'
  | 'mail'
  | 'map-pin'
  | 'menu'
  | 'trophy'

interface IconProps extends CommonProps {
  name: IconName
}

export function Icon({ name, className, ...rest }: IconProps) {

  const getIcon = useMemo(() => {
    switch (name) {
      case 'angle-down':
        return <AngleDownIcon className={className} aria-hidden={true} {...rest} />;
      case 'angle-left':
        return <AngleLeftIcon className={className} aria-hidden={true} {...rest} />;
      case 'angle-left-from-line':
        return <AngleLeftFromLineIcon className={className} aria-hidden={true} {...rest} />;
      case 'angle-right':
        return <AngleRightIcon className={className} aria-hidden={true} {...rest} />;
      case 'angle-right-from-line':
        return <AngleRightFromLineIcon className={className} aria-hidden={true} {...rest} />;
      case 'angle-up':
        return <AngleUpIcon className={className} aria-hidden={true} {...rest} />;
      case 'arrow-right':
        return <ArrowRightIcon className={className} aria-hidden={true} {...rest} />;
      case 'book':
        return <BookIcon className={className} aria-hidden={true} {...rest} />;
      case 'brief-case':
        return <BriefCaseIcon className={className} aria-hidden={true} {...rest} />;
      case 'burger-menu':
        return <BurgerMenuIcon className={className} aria-hidden={true} {...rest} />;
      case 'burger-menu-left':
        return <BurgerMenuLeftIcon className={className} aria-hidden={true} {...rest} />;
      case 'close':
        return <CloseIcon className={className} aria-hidden={true} {...rest} />;
      case 'compass':
        return <CompassIcon className={className} aria-hidden={true} {...rest} />;
      case 'error':
        return <ErrorIcon className={className} aria-hidden={true} {...rest} />;
      case 'external-redirection':
        return <ExternalRedirectionIcon className={className} aria-hidden={true} {...rest} />;
      case 'filter':
        return <FilterIcon className={className} aria-hidden={true} {...rest} />;
      case 'home':
        return <HomeIcon className={className} aria-hidden={true} {...rest} />;
      case 'information':
        return <InformationIcon className={className} aria-hidden={true} {...rest} />;
      case 'magnifying-glass':
        return <MagnifyingGlassIcon className={className} aria-hidden={true} {...rest}/>;
      case 'map-pin':
        return <MapPinIcon className={className} aria-hidden={true} {...rest} />;
      case 'menu':
        return <MenuIcon className={className} aria-hidden={true} {...rest} />;
      case 'mail':
        return <MailIcon className={className} aria-hidden={true} {...rest} />;
      case 'trophy':
        return <TrophyIcon className={className} aria-hidden={true} {...rest} />;
      default:
        return null;
    }
  }, [name, className, rest]);

  return ( getIcon );
}
