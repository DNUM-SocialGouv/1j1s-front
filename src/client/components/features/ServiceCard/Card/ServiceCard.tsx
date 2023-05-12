import classNames from 'classnames';
import React, {
	useMemo,
} from 'react';

import { HtmlHeadingTag } from '~/client/components/props';
import { Card } from '~/client/components/ui/Card/Card';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { Link } from '~/client/components/ui/Link/Link';
import useBreakpoint from '~/client/hooks/useBreakpoint';
import { useIsInternalLink } from '~/client/hooks/useIsInternalLink';
import useReferrer from '~/client/hooks/useReferrer';

import styles from './ServiceCard.module.scss';

export function ServiceCardList({ children }: React.PropsWithChildren) {
	return (
		<div className={styles.services}>
			<ul aria-label="Liste des partenaires et des services">
				{
					React.Children.map(children, (child, index) => (
						<li key={index}>
							{child}
						</li>
					))
				}
			</ul>
		</div>
	);
}

interface ServiceCardProps {
	children: React.ReactNode
	imageFit?: 'cover' | 'contain'
	logo: string
	link: string
	linkLabel: string
	title: string
	titleAs: HtmlHeadingTag
}

export function ServiceCard(props: ServiceCardProps & React.HTMLAttributes<HTMLLinkElement>) {
	const {
		className, imageFit = 'contain', logo, link, linkLabel, title, titleAs, children,
	} = props;
	const isInternalLink = useIsInternalLink(link);
	const { isLargeScreen } = useBreakpoint();
	useReferrer();

	const icon = useMemo(function () {
		return <Icon name={isInternalLink ? 'arrow-right' : 'external-redirection'}/>;
	}, [isInternalLink]);


	return (
		<Link href={link} className={classNames(styles.cardContainer, className, 'underline-none')}>
			<Card
				layout={isLargeScreen ? 'horizontal' : 'vertical'}
				className={classNames(
					styles.card,
					isLargeScreen ? styles.cardHorizontal : styles.cardVertical,
					imageFit === 'cover' && styles.cardCover)}
			>
				<Card.Image className={styles.cardLogo} src={logo} aria-hidden/>
				<Card.Content className={styles.cardBody}>
					<Card.Title titleAs={titleAs} className={styles.cardTitle}>{title}</Card.Title>
					<p>{children}</p>
					<span className={styles.cardAction}>
						<Card.FakeLink appearance={'tertiary'} label={linkLabel} icon={icon}/>
					</span>
				</Card.Content>
			</Card>
		</Link>
	);
}
