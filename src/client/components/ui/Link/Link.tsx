import classNames from 'classnames';
import LinkNext from 'next/link';
import React, {
	createContext,
	Dispatch,
	PropsWithChildren,
	SetStateAction,
	useContext,
	useEffect,
	useState,
} from 'react';

import { Icon, IconName, IconProps } from '~/client/components/ui/Icon/Icon';
import NoProviderError from '~/client/Errors/NoProviderError';
import { useIsInternalLink } from '~/client/hooks/useIsInternalLink';
import { getTextFromChildren } from '~/client/utils/getTextFromChildren.util';

import styles from './Link.module.scss';

type ButtonAppearance = 'asPrimaryButton' | 'asSecondaryButton' | 'asTertiaryButton' | 'asQuaternaryButton';


interface Link extends React.ComponentPropsWithoutRef<'a'> {
	href: string
	appearance?: ButtonAppearance
	prefetch?: boolean
}

interface LinkContext {
	setIsLinkIcon: Dispatch<SetStateAction<boolean>>,
	href: string
}

const LinkContext = createContext<LinkContext | null>(null);

const useLinkContext = () => {
	const linkContext = useContext(LinkContext);
	if (linkContext === null) {
		throw new NoProviderError(LinkContext);
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
	const [isLinkIcon, setIsLinkIcon] = useState<boolean>(false);
	const isInternalLink = useIsInternalLink(href);

	const appearanceClass = () => {
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
	};

	function getTitle() {
		if (isInternalLink) {
			return title;
		}
		return title ?? `${getTextFromChildren(children)} - nouvelle fenêtre`;
	}

	return isInternalLink ? (
		<LinkContext.Provider value={{ href, setIsLinkIcon }}>
			<LinkNext
				href={href}
				title={getTitle()}
				prefetch={prefetch}
				className={classNames(className, appearanceClass(), isLinkIcon ? styles.linkWithIcon : '')} {...rest}>
				{children}
			</LinkNext>
		</LinkContext.Provider>
	) : (
		<LinkContext.Provider value={{ href, setIsLinkIcon }}>
			<a href={href} title={getTitle()} target="_blank" rel="noreferrer"
				 className={classNames(className, appearanceClass(), isLinkIcon ? styles.linkWithIcon : '')} {...rest}>
				{children}
			</a>
		</LinkContext.Provider>
	);
}

interface LinkIconProps extends Omit<IconProps, 'name'> {
	name?: IconName
	className?: string
}

export function LinkIcon(props: LinkIconProps) {
	const {
		name,
		className,
		...rest
	} = props;
	const { setIsLinkIcon, href } = useLinkContext();
	const isInternalLink = useIsInternalLink(href);

	useEffect(() => {
		setIsLinkIcon(true);
	}, [setIsLinkIcon]);

	return (<span className={styles.icon}>
		{name ? <Icon className={className} name={name} {...rest}/> : <DefaultLinkIcon isInternalLink={isInternalLink}/>}
	</span>
	);
}

type DefaultLinkIconProps = {
	isInternalLink: boolean
}

function DefaultLinkIcon({ isInternalLink }: DefaultLinkIconProps) {
	return <>{isInternalLink ? <Icon name="arrow-right"/> : <Icon name="external-redirection"/>}</>;
}

Link.Icon = LinkIcon;


