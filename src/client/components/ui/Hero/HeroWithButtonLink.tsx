import React from 'react';

import { Image } from '~/client/components/ui/Img';

import { Link } from '../Link/Link';

interface HeroWithButtonLinkProps {
  titlePrimaryText: React.ReactNode
  titleSecondaryText?: React.ReactNode
  content: React.ReactNode
  buttonLabel: string
  buttonLabelSecondary?: string
  buttonHref: string
  buttonHrefSecondary?: string
  imgSrc: string
  additionalInformation?: React.ReactNode
}

export function HeroWithButtonLink(props: HeroWithButtonLinkProps) {
	const { titlePrimaryText, titleSecondaryText, content, buttonLabel, buttonLabelSecondary, buttonHref, buttonHrefSecondary, imgSrc, additionalInformation } = props;

	return (
		<div className="fr-container">
			<div className="fr-grid-row fr-grid-row--gutters">
				<div className="fr-col-lg-6 fr-col-12">
					<div className="fr-py-4w">
							<h1 className="fr-h1 fr-mb-4w">
								<span className="text--blue">{titlePrimaryText} </span>
								{titleSecondaryText}
							</h1>
							<p className="fr-text--lead fr-mb-4w">
								{content}
							</p>
							<div className="fr-grid-row fr-grid-row--center">
								<Link className="fr-btn fr-btn--lg" href={buttonHref}>{buttonLabel}</Link>
								{(buttonLabelSecondary && buttonHrefSecondary) && <Link className="fr-btn fr-btn--secondary fr-mt-2w" href={buttonHrefSecondary}>{buttonLabelSecondary}</Link>}
							</div>
							{additionalInformation}
						</div>
					</div>
				<div className="fr-col-lg-6 fr-col-12 fr-hidden fr-unhidden-lg">
					<Image className="img-cover height--full" src={imgSrc} alt="" width="810" height="540" priority />
				</div>
			</div>
		</div>

	);
}
