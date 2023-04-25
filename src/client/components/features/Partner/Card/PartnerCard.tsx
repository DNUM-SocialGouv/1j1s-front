import classNames from 'classnames';
import React, {
	useMemo,
} from 'react';

import styles from '~/client/components/features/Partner/Card/PartnerCard.module.scss';
import { HtmlHeadingTag } from '~/client/components/props';
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

type PartnerCardBaseProps = {
	children: React.ReactNode
	logo: string
	link: string
	linkLabel: string
}
type PartnerCardProps = PartnerCardBaseProps &
	({title?: never; titleAs?: never } | {title: string; titleAs: HtmlHeadingTag })


export function PartnerCard(props: PartnerCardProps & React.HTMLAttributes<HTMLLinkElement>) {
	const { className, logo, link, linkLabel, title, titleAs , children } = props;
	const isInternalLink = useIsInternalLink(link);
	const { isLargeScreen } = useBreakpoint();
	useReferrer();

	const icon = useMemo(function () {
		return <Icon name={isInternalLink ? 'arrow-right' : 'external-redirection'}/>;
	}, [isInternalLink]);


	return (
		<Link href={link} className={classNames(styles.card, className, 'underline-none')}>
			<Card layout={isLargeScreen ? 'horizontal' : 'vertical'} className={styles.cardContainer}>
				<Card.Image className={styles.cardLogo} src={logo} aria-hidden/>
				<Card.Content className={styles.cardBody}>
					title ?? <Card.Title titleAs={titleAs!} className={styles.cardBody__Title}>{title}</Card.Title>
					<p>{children}</p>
					<span className={styles.cardAction}>
						<Card.FakeLink appearance={'tertiary'} label={linkLabel} icon={icon}/>
					</span>
				</Card.Content>
			</Card>
		</Link>
	);
}
