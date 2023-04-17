import React, { useMemo } from 'react';

import { AccountIcon } from '~/client/components/ui/Icon/account.icon';
import { AngleDownIcon } from '~/client/components/ui/Icon/angle-down.icon';
import { AngleLeftIcon } from '~/client/components/ui/Icon/angle-left.icon';
import { AngleLeftFromLineIcon } from '~/client/components/ui/Icon/angle-left-from-line.icon';
import { AngleRightIcon } from '~/client/components/ui/Icon/angle-right.icon';
import { AngleRightFromLineIcon } from '~/client/components/ui/Icon/angle-right-from-line.icon';
import { AngleUpIcon } from '~/client/components/ui/Icon/angle-up.icon';
import { ArrowRightIcon } from '~/client/components/ui/Icon/arrow-right.icon';
import { AwardIcon } from '~/client/components/ui/Icon/award.icon';
import { BedIcon } from '~/client/components/ui/Icon/bed.icon';
import { BikeIcon } from '~/client/components/ui/Icon/bike.icon';
import { BookIcon } from '~/client/components/ui/Icon/book.icon';
import { BriefCaseIcon } from '~/client/components/ui/Icon/brief-case.icon';
import { BurgerMenuIcon } from '~/client/components/ui/Icon/burger-menu.icon';
import { BurgerMenuLeftIcon } from '~/client/components/ui/Icon/burger-menu-left.icon';
import { CarIcon } from '~/client/components/ui/Icon/car.icon';
import { CleanHandsIcon } from '~/client/components/ui/Icon/clean-hands.icon';
import { CloseIcon } from '~/client/components/ui/Icon/close.icon';
import { CommunityIcon } from '~/client/components/ui/Icon/community.icon';
import { CompassIcon } from '~/client/components/ui/Icon/compass.icon';
import { ErrorIcon } from '~/client/components/ui/Icon/error.icon';
import { EuroIcon } from '~/client/components/ui/Icon/euro.icon';
import { ExitIcon } from '~/client/components/ui/Icon/exit.icon';
import { ExternalRedirectionIcon } from '~/client/components/ui/Icon/external-redirection.icon';
import { FilterIcon } from '~/client/components/ui/Icon/filter.icon';
import { HomeIcon } from '~/client/components/ui/Icon/home.icon';
import { InformationIcon } from '~/client/components/ui/Icon/information.icon';
import { IronIcon } from '~/client/components/ui/Icon/iron.icon';
import { LockIcon } from '~/client/components/ui/Icon/lock.icon';
import { MagnifyingGlassIcon } from '~/client/components/ui/Icon/magnifying-glass.icon';
import { MailIcon } from '~/client/components/ui/Icon/mail.icon';
import { MapPinIcon } from '~/client/components/ui/Icon/map-pin.icon';
import { MarkPenIcon } from '~/client/components/ui/Icon/mark-pen.icon';
import { MenuIcon } from '~/client/components/ui/Icon/menu.icon';
import { MicrowaveIcon } from '~/client/components/ui/Icon/microwave.icon';
import { PhoneIcon } from '~/client/components/ui/Icon/phone.icon';
import { PlantIcon } from '~/client/components/ui/Icon/plant.icon';
import { RestaurantIcon } from '~/client/components/ui/Icon/restaurant.icon';
import { RoadmapIcon } from '~/client/components/ui/Icon/roadmap.icon';
import { SportIcon } from '~/client/components/ui/Icon/sport.icon';
import { SuitcaseIcon } from '~/client/components/ui/Icon/suitcase.icon';
import { SunIcon } from '~/client/components/ui/Icon/sun';
import { SwimmingIcon } from '~/client/components/ui/Icon/swimming.icon';
import { TableIcon } from '~/client/components/ui/Icon/table.icon';
import { TemperatureIcon } from '~/client/components/ui/Icon/temperature.icon';
import { ThumbUpIcon } from '~/client/components/ui/Icon/thumb-up';
import { TrophyIcon } from '~/client/components/ui/Icon/trophy.icon';
import { TVIcon } from '~/client/components/ui/Icon/tv.icon';
import { UserIcon } from '~/client/components/ui/Icon/user.icon';
import { VacuumIcon } from '~/client/components/ui/Icon/vacuum.icon';
import { WashingMachineIcon } from '~/client/components/ui/Icon/washing-machine.icon';
import { WifiIcon } from '~/client/components/ui/Icon/wifi.icon';

export type IconName =
    'account'
    | 'angle-down'
    | 'angle-left'
    | 'angle-left-from-line'
    | 'angle-right'
    | 'angle-right-from-line'
    | 'angle-up'
    | 'arrow-right'
    | 'award'
	| 'bed'
    | 'bike'
    | 'book'
    | 'brief-case'
    | 'burger-menu'
    | 'burger-menu-left'
    | 'car'
    | 'clean-hands'
    | 'close'
    | 'community'
    | 'compass'
    | 'error'
    | 'euro'
    | 'exit'
    | 'external-redirection'
    | 'filter'
    | 'home'
    | 'information'
    | 'iron'
    | 'lock'
    | 'magnifying-glass'
    | 'mail'
    | 'map-pin'
    | 'mark-pen'
    | 'menu'
    | 'microwave'
    | 'phone'
    | 'plant'
    | 'restaurant'
    | 'roadmap'
    | 'sport'
    | 'suitcase'
    | 'sun'
    | 'swimming'
    | 'table'
    | 'temperature'
    | 'thumb-up'
    | 'trophy'
    | 'TV'
    | 'user'
    | 'vacuum'
    | 'washing-machine'
    | 'wifi'

interface IconProps extends React.ComponentPropsWithoutRef<'svg'> {
    name: IconName;
}

export function Icon({ name, className, ...rest }: IconProps) {

	const getIcon = useMemo(() => {
		switch (name) {
			case 'account':
				return <AccountIcon className={className} aria-hidden={true} {...rest} />;
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
			case 'award':
				return <AwardIcon className={className} aria-hidden={true} {...rest} />;
			case 'bed':
				return <BedIcon className={className} aria-hidden={true} {...rest} />;
			case 'bike':
				return <BikeIcon className={className} aria-hidden={true} {...rest} />;
			case 'book':
				return <BookIcon className={className} aria-hidden={true} {...rest} />;
			case 'brief-case':
				return <BriefCaseIcon className={className} aria-hidden={true} {...rest} />;
			case 'burger-menu':
				return <BurgerMenuIcon className={className} aria-hidden={true} {...rest} />;
			case 'burger-menu-left':
				return <BurgerMenuLeftIcon className={className} aria-hidden={true} {...rest} />;
			case 'car':
				return <CarIcon className={className} aria-hidden={true} {...rest} />;
			case 'clean-hands':
				return <CleanHandsIcon className={className} aria-hidden={true} {...rest} />;
			case 'close':
				return <CloseIcon className={className} aria-hidden={true} {...rest} />;
			case 'community':
				return <CommunityIcon className={className} aria-hidden={true} {...rest} />;
			case 'compass':
				return <CompassIcon className={className} aria-hidden={true} {...rest} />;
			case 'error':
				return <ErrorIcon className={className} aria-hidden={true} {...rest} />;
			case 'euro':
				return <EuroIcon className={className} aria-hidden={true} {...rest} />;
			case 'exit':
				return <ExitIcon className={className} aria-hidden={true} {...rest} />;
			case 'external-redirection':
				return <ExternalRedirectionIcon className={className} aria-hidden={true} {...rest} />;
			case 'filter':
				return <FilterIcon className={className} aria-hidden={true} {...rest} />;
			case 'home':
				return <HomeIcon className={className} aria-hidden={true} {...rest} />;
			case 'information':
				return <InformationIcon className={className} aria-hidden={true} {...rest} />;
			case 'iron':
				return <IronIcon className={className} aria-hidden={true} {...rest} />;
			case 'lock':
				return <LockIcon className={className} aria-hidden={true} {...rest} />;
			case 'magnifying-glass':
				return <MagnifyingGlassIcon className={className} aria-hidden={true} {...rest}/>;
			case 'map-pin':
				return <MapPinIcon className={className} aria-hidden={true} {...rest} />;
			case 'mark-pen':
				return <MarkPenIcon className={className} aria-hidden={true} {...rest} />;
			case 'menu':
				return <MenuIcon className={className} aria-hidden={true} {...rest} />;
			case 'microwave':
				return <MicrowaveIcon className={className} aria-hidden={true} {...rest} />;
			case 'mail':
				return <MailIcon className={className} aria-hidden={true} {...rest} />;
			case 'phone':
				return <PhoneIcon className={className} aria-hidden={true} {...rest} />;
			case 'plant':
				return <PlantIcon className={className} aria-hidden={true} {...rest} />;
			case 'restaurant':
				return <RestaurantIcon className={className} aria-hidden={true} {...rest} />;
			case 'roadmap':
				return <RoadmapIcon className={className} aria-hidden={true} {...rest} />;
			case 'sport':
				return <SportIcon className={className} aria-hidden={true} {...rest} />;
			case 'suitcase':
				return <SuitcaseIcon className={className} aria-hidden={true} {...rest} />;
			case 'sun':
				return <SunIcon className={className} aria-hidden={true} {...rest} />;
			case 'swimming':
				return <SwimmingIcon className={className} aria-hidden={true} {...rest} />;
			case 'table':
				return <TableIcon className={className} aria-hidden={true} {...rest} />;
			case 'temperature':
				return <TemperatureIcon className={className} aria-hidden={true} {...rest} />;
			case 'thumb-up':
				return <ThumbUpIcon className={className} aria-hidden={true} {...rest} />;
			case 'trophy':
				return <TrophyIcon className={className} aria-hidden={true} {...rest} />;
			case 'TV':
				return <TVIcon className={className} aria-hidden={true} {...rest} />;
			case 'user':
				return <UserIcon className={className} aria-hidden={true} {...rest} />;
			case 'vacuum':
				return <VacuumIcon className={className} aria-hidden={true} {...rest} />;
			case 'washing-machine':
				return <WashingMachineIcon className={className} aria-hidden={true} {...rest} />;
			case 'wifi':
				return <WifiIcon className={className} aria-hidden={true} {...rest} />;
			default:
				return null;
		}
	}, [name, className, rest]);

	return (getIcon);
}
