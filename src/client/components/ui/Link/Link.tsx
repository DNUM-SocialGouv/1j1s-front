import classNames from 'classnames';
import LinkNext from 'next/link';
import React, {
	createContext,
	Dispatch,
	PropsWithChildren,
	SetStateAction,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';

import { Icon, IconName } from '~/client/components/ui/Icon/Icon';
import { useIsInternalLink } from '~/client/hooks/useIsInternalLink';
import { getTextFromChildren } from '~/client/utils/getTextFromChildren.util';

import styles from './Link.module.scss';

type ButtonAppearance = 'asPrimaryButton' | 'asSecondaryButton' | 'asTertiaryButton' | 'asQuaternaryButton';

type IconPosition = 'top' | 'left' | 'right';


interface Link extends React.ComponentPropsWithoutRef<'a'> {
	href: string
	appearance?: ButtonAppearance
	prefetch?: boolean
}

interface LinkContext {
	setIconPosition: Dispatch<SetStateAction<IconPosition | undefined>>,
	href: string
}

const LinkContext = createContext<LinkContext | null>(null);

const useLinkContext = () => {
	const linkContext = useContext(LinkContext);
	if (!linkContext) {
		throw new Error(
			'linkContext has to be used within <CurrentUserContext.Provider>',
		);
	}
	return linkContext;
};

export function Link(props: PropsWithChildren<Link>) {
	const {
		className,
		appearance,
		children,
		href,
		prefetch = false,
		title,
		...rest
	} = props;
	const [iconPosition, setIconPosition] = useState<IconPosition | undefined>(undefined);
	const isInternalLink = useIsInternalLink(href);

	const appearanceClass = useMemo(() => {
		switch (appearance) {
			case 'asPrimaryButton':
				return styles.primary;
			case 'asSecondaryButton':
				return styles.secondary;
			case 'asTertiaryButton':
				return styles.tertiary;
			case 'asQuaternaryButton':
				return styles.quaternary;
			default:
				return;
		}
	}, [appearance]);

	const linkWithIconClass = useMemo(() => {
		switch (iconPosition) {
			case 'top':
				return styles.linkWithTopIcon;
			case 'left':
				return styles.linkWithLeftIcon;
			case 'right':
				return styles.linkWithRightIcon;
		}
	}, [iconPosition]);

	function getTitle() {
		if (isInternalLink) {
			return title;
		}
		return title ?? `${getTextFromChildren(children)} - nouvelle fenêtre`;
	}

	return isInternalLink ? (
		<LinkContext.Provider value={{ href, setIconPosition }}>
			<LinkNext
				href={href}
				title={getTitle()}
				prefetch={prefetch}
				className={classNames(className, appearanceClass, linkWithIconClass)} {...rest}>
				{children}
			</LinkNext>
		</LinkContext.Provider>
	) : (
		<LinkContext.Provider value={{ href, setIconPosition }}>
			<a href={href} title={getTitle()} target="_blank" rel="noreferrer"
				 className={classNames(className, appearanceClass, linkWithIconClass)} {...rest}>
				{children}
			</a>
		</LinkContext.Provider>
	);
}

type IconComponentProps = typeof Icon

interface IconProps extends Omit<IconComponentProps, 'name'> {
	position?: IconPosition;
	name?: IconName
	className?: string
}

export function LinkIcon(props: IconProps) {
	const {
		name,
		className,
		position = 'right',
		...rest
	} = props;
	const { setIconPosition, href } = useLinkContext();
	const isInternalLink = useIsInternalLink(href);

	useEffect(() => {
		setIconPosition(position);
	}, [position, setIconPosition]);

	return (<span className={styles.icon}>
		{name ? <Icon className={className} name={name} {...rest}/> : <DefaultIcon isInternalLink={isInternalLink}/>}
	</span>
	);
}

type DefaultIconProps = {
	isInternalLink: boolean
}

function DefaultIcon({ isInternalLink }: DefaultIconProps) {
	return <>{isInternalLink ? <Icon name="arrow-right"/> : <Icon name="external-redirection"/>}</>;
}

Link.Icon = LinkIcon;


