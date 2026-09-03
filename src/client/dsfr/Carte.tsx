import classNames from 'classnames';
import React from 'react';

import { HtmlHeadingTag } from '~/client/components/props';
import { useIsInternalLink } from '~/client/hooks/useIsInternalLink';

import { Tag } from './Tag';
import { Image } from '../components/ui/Img';

interface CarteProps {
	titre: string
	lien: string
	tags?: string[]
	imageSrc?: string
	imageAlt?: string
	titreAs?: HtmlHeadingTag
	className?: string
	horizontal?: boolean
}

export function Carte({
	children,
	titre,
	lien,
	tags,
	imageSrc,
	imageAlt = '',
	titreAs = 'h3',
	className,
	horizontal = false,
}: React.PropsWithChildren<CarteProps>) {
	const isInternalLink = useIsInternalLink(lien);
	const externalLinkProps = !isInternalLink ? { target: '_blank', rel: 'noreferrer', title: `${titre} - nouvelle fenêtre` } : {};

	return (
		<div className={classNames('fr-card', 'fr-enlarge-link', { 'fr-card--horizontal': horizontal }, className)}>
			<div className="fr-card__body">
				<div className="fr-card__content">
					{tags && tags.length > 0 && (
						<div className="fr-card__start">
							<ul className="fr-tags-group">
								{tags.map((tag) => (
									<li key={tag}>
										<Tag label={tag} />
									</li>
								))}
							</ul>
						</div>
					)}
					{React.createElement(
						titreAs,
						{ className: 'fr-card__title' },
						<a href={lien} {...externalLinkProps}>{titre}</a>
					)}
					<p className="fr-card__desc">{children}</p>
				</div>
			</div>
			{imageSrc && (
				<div className="fr-card__header">
					<div className="fr-card__img">
						<img className="fr-responsive-img" src={imageSrc} alt={imageAlt} />
					</div>
				</div>
			)}
		</div>
	);
}
