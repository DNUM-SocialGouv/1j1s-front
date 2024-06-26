import classNames from 'classnames';
import React from 'react';

import { HtmlHeadingTag } from '~/client/components/props';
import styles from '~/client/components/ui/Card/Link/LinkCard.module.scss';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { Image } from '~/client/components/ui/Img';
import { Link } from '~/client/components/ui/Link/Link';

interface LinkCardProps extends Pick<React.HTMLAttributes<unknown>, 'className'> {
	imageUrl: string
	link: string
	linkLabel?: string
	title: string
  titleAs?: HtmlHeadingTag
}

export function LinkCard({ children, className, imageUrl, link, linkLabel, title, titleAs }: React.PropsWithChildren<LinkCardProps>)  {

	function LinkCardTitle({ children, className }: { titleAs?: HtmlHeadingTag } & React.HTMLAttributes<HTMLTitleElement>) {
		return React.createElement(titleAs || 'h3', { className: className }, children);
	}

	return (
		<Link href={link} className={classNames(styles.card, 'underline-none')} prefetch={false}>
			<article className={classNames(styles.cardArticle, className)}>
				<div className={styles.cardImageWrapper}>
					<Image src={imageUrl} alt="" width={328} height={180} />
				</div>

				<div className={styles.cardContent}>
					<div className={styles.cardContentHeader}>
						<LinkCardTitle className={styles.cardTitle}>{title}</LinkCardTitle>
						<span className={styles.cardAction}>
							<span className="sr-only">{linkLabel}</span>
							<Icon name='angle-right' aria-hidden="true"/>
						</span>
					</div>

					<div className={styles.cardDescription}>{children}</div>
				</div>
			</article>
		</Link>
	);
};


