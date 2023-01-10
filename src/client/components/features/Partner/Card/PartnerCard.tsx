import classNames from 'classnames';
import React, {
	useMemo,
} from 'react';

import styles from '~/client/components/features/Partner/Card/PartnerCard.module.scss';
import { Card } from '~/client/components/ui/Card/Card';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { Link } from '~/client/components/ui/Link/Link';
import useBreakpoint from '~/client/hooks/useBreakpoint';
import { useIsInternalLink } from '~/client/hooks/useIsInternalLink';
import useReferrer from '~/client/hooks/useReferrer';

export function PartnerCardList({ children }: React.PropsWithChildren) {
	return (
		<div className={styles.partnerListWrapper}>
			<ul className={styles.partnerList} aria-label="Liste des partenaires">
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

interface PartnerCardProps {
	description: string
	headline?: string
	headlineColor?: 'default' | 'pink' | 'red' | 'blue'
	logo: string
	link: string
	linkLabel: string
	title?: string
}

export function PartnerCard(props: PartnerCardProps & React.HTMLAttributes<HTMLLinkElement>) {
	const { description, className, headline, headlineColor, logo, link, linkLabel, title } = props;
	const isInternalLink = useIsInternalLink(link);
	const { isLargeScreen } = useBreakpoint();
	useReferrer();

	const appearanceLinkBold = useMemo(() => {
		switch (headlineColor) {
			case 'pink':
				return styles.bonneBoiteColor;
			case 'red':
				return styles.onisepColor;
			case 'blue':
				return styles.serviceCiviqueColor;
			default:
				return styles.link;
		}
	}, [headlineColor]);

	const icon = useMemo(function () {
		return <Icon name={isInternalLink ? 'arrow-right' : 'external-redirection'}/>;
	}, [isInternalLink]);


	return (
		<Link href={link} className={classNames(styles.card, className, 'underline-none')}>
			<Card layout={isLargeScreen ? 'horizontal' : 'vertical'}>
				<Card.Image className={styles.cardLogo} src={logo} aria-hidden/>
				<Card.Content className={styles.cardBody}>
					<Card.Title titleAs={'h3'} className={styles.cardBody__Title}>{title}</Card.Title>
					<p>
						{headline && <strong className={classNames(styles.cardHeadline, appearanceLinkBold)}>{headline}</strong>}
						{description}
					</p>
					<span className={styles.cardAction}>
						<Card.FakeLink appearance={'tertiary'} label={linkLabel} icon={icon}/>
					</span>
				</Card.Content>
			</Card>
		</Link>
	);
}
