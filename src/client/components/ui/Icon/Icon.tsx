import { AngleDownIcon } from '~/client/components/ui/Icon/svg/angle-down.icon';
import { AngleLeftIcon } from '~/client/components/ui/Icon/svg/angle-left.icon';
import { AngleLeftFromLineIcon } from '~/client/components/ui/Icon/svg/angle-left-from-line.icon';
import { AngleRightIcon } from '~/client/components/ui/Icon/svg/angle-right.icon';
import { AngleRightFromLineIcon } from '~/client/components/ui/Icon/svg/angle-right-from-line.icon';
import { AngleUpIcon } from '~/client/components/ui/Icon/svg/angle-up.icon';
import { ArrowRightIcon } from '~/client/components/ui/Icon/svg/arrow-right.icon';
import { BookIcon } from '~/client/components/ui/Icon/svg/book.icon';
import { BriefCaseIcon } from '~/client/components/ui/Icon/svg/brief-case.icon';
import { BurgerMenuIcon } from '~/client/components/ui/Icon/svg/burger-menu.icon';
import { BurgerMenuLeftIcon } from '~/client/components/ui/Icon/svg/burger-menu-left.icon';
import { CompassIcon } from '~/client/components/ui/Icon/svg/compass.icon';
import { ErrorIcon } from '~/client/components/ui/Icon/svg/error.icon';
import { FilterIcon } from '~/client/components/ui/Icon/svg/filter.icon';
import { HomeIcon } from '~/client/components/ui/Icon/svg/home.icon';
import { InformationIcon } from '~/client/components/ui/Icon/svg/information.icon';
import { InsideRedirectionIcon } from '~/client/components/ui/Icon/svg/inside-redirection.icon';
import { MagnifyingGlassIcon } from '~/client/components/ui/Icon/svg/magnifying-glass.icon';
import { ShareIcon } from '~/client/components/ui/Icon/svg/share.icon';
import { TrophyIcon } from '~/client/components/ui/Icon/svg/trophy.icon';
import { XmarkIcon } from '~/client/components/ui/Icon/svg/xmark.icon';

export type IconType =
  'angle-down' |
  'angle-left' |
  'angle-left-from-line' |
  'angle-right' |
  'angle-right-from-line' |
  'angle-up' |
  'arrow-right' |
  'book' |
  'brief-case' |
  'burger-menu' |
  'burger-menu-left' |
  'compass' |
  'error' |
  'filter' |
  'home' |
  'information' |
  'inside-redirection' |
  'magnifying-glass' |
  'share' |
  'trophy' |
  'xmark'

export interface SvgProps {
  color?: string
}

export interface IconProps {
  type: IconType
}

export function Icon({ type }: IconProps) {
  switch (type) {
    case 'angle-down' : return <AngleDownIcon />;
    case 'angle-left' : return <AngleLeftIcon />;
    case 'angle-left-from-line' : return <AngleLeftFromLineIcon />;
    case 'angle-right' : return <AngleRightIcon />;
    case 'angle-right-from-line' : return <AngleRightFromLineIcon />;
    case 'angle-up' : return <AngleUpIcon />;
    case 'arrow-right' : return <ArrowRightIcon />;
    case 'book' : return <BookIcon />;
    case 'brief-case' : return <BriefCaseIcon />;
    case 'burger-menu' : return <BurgerMenuIcon />;
    case 'burger-menu-left' : return <BurgerMenuLeftIcon />;
    case 'compass' : return <CompassIcon />;
    case 'error' : return <ErrorIcon />;
    case 'filter' : return <FilterIcon />;
    case 'home' : return <HomeIcon />;
    case 'information' : return <InformationIcon />;
    case 'inside-redirection' : return <InsideRedirectionIcon />;
    case 'magnifying-glass' : return <MagnifyingGlassIcon />;
    case 'share' : return <ShareIcon />;
    case 'trophy' : return <TrophyIcon />;
    case 'xmark' : return <XmarkIcon />;
  }
}
