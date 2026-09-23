import classNames from 'classnames';
import Link from 'next/link';
import React from 'react';

import { HtmlHeadingTag } from '~/client/components/props';
import { useIsInternalLink } from '~/client/hooks/useIsInternalLink';

import { Tag } from './Tag';
import { Image } from '../components/ui/Img';

interface CarteProps {
	titre: string | React.ReactNode
	lien?: string
	tags?: React.ReactNode[]
	imageSrc?: string
	imageAlt?: string
	titreAs?: HtmlHeadingTag
	className?: string
	horizontal?: boolean
	end?: React.ReactNode
	imageFit?: 'cover' | 'contain'
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
	end,
	imageFit = 'cover',
}: React.PropsWithChildren<CarteProps>) {
	const isInternalLink = useIsInternalLink(lien || "");
	const imageClassName = classNames(imageFit === 'contain' && 'img-contain');

	return (
		<div className={classNames('fr-card', 'fr-enlarge-link', { 'fr-card--horizontal': horizontal }, className)}>
			<div className="fr-card__body">
				<div className="fr-card__content">
					{tags && tags.length > 0 && (
						<div className="fr-card__start">
							<ul className="fr-tags-group">
								{tags.map((tag, index) => (
									<li key={index}>
										<Tag>{tag}</Tag>
									</li>
								))}
							</ul>
						</div>
					)}
					{React.createElement(
						titreAs,
						{ className: 'fr-card__title' },
						lien
							? (isInternalLink
								? <Link href={lien}>{titre}</Link>
								: <a href={lien} target="_blank" rel="noreferrer" title={`${titre} - nouvelle fenêtre`}>{titre}</a>)
							: titre
					)}
					<p className="fr-card__desc">{children}</p>
					{end && (
						<div className="fr-card__end">{end}</div>
					)}
				</div>
			</div>
			{imageSrc && (
				<div className="fr-card__header">
					<div className="fr-card__img">
						<Image src={imageSrc} alt={imageAlt} className={imageClassName} width={300} height={300}  />
					</div>
				</div>
			)}
		</div>
	);
}
