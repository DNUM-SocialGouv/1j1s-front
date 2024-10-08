import classNames from 'classnames';
import React, { useId } from 'react';

import { HtmlHeadingTag } from '~/client/components/props';
import styles from '~/client/components/ui/Card/Link/LinkCard.module.scss';
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

	function LinkCardTitle({ children, ...props }: { titleAs?: HtmlHeadingTag } & React.HTMLAttributes<HTMLHeadingElement>) {
		return React.createElement(titleAs || 'h3', { ...props }, children);
	}

	const idIntitule = useId();
	const idLien = useId();

	return (
		<article className={classNames(styles.card, className)}>
			<div className={styles.cardImageWrapper}>
				<Image src={imageUrl} alt="" width={328} height={180} />
			</div>

			<div className={styles.cardContent}>
				<div className={styles.cardContentHeader}>
					<LinkCardTitle id={idIntitule} className={styles.cardTitle}>{title}</LinkCardTitle>
					<span className={styles.cardAction}>
						<Link aria-labelledby={`${idIntitule} ${idLien}`}
							href={link}
							className={classNames('underline-none')}
							id={idLien}
							prefetch={false}>
							<span className="sr-only">{linkLabel}</span>
							<Link.Icon name="angle-right" aria-hidden="false" />
						</Link>
					</span>
				</div>

				<div className={styles.cardDescription}>{children}</div>
			</div>
		</article>
	);
};


