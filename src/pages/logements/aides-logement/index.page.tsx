import classNames from 'classnames';

import { PartnerCard } from '~/client/components/features/Partner/Card/PartnerCard';
import { Head } from '~/client/components/head/Head';
import { Container } from '~/client/components/layouts/Container/Container';
import { ArticleCard } from '~/client/components/ui/Card/Article/ArticleCard';
import { HeroWithButtonLink } from '~/client/components/ui/Hero/HeroWithButtonLink';
import { Icon } from '~/client/components/ui/Icon/Icon';
import useAnalytics from '~/client/hooks/useAnalytics';
import useReferrer from '~/client/hooks/useReferrer';
import analytics from '~/pages/logements/aides-logement/index.analytics';
import styles from '~/pages/logements/aides-logement/index.module.scss';

export default function AidesLogement() {
	useAnalytics(analytics);
	useReferrer();

	return (
		<>
			<Head
				title="Les aides au logement | 1jeune1solution"
				robots="index,follow"
			/>
			<main id="contenu">
				<HeroWithButtonLink
					titlePrimaryText="Je découvre les aides pour payer mon logement "
					titleSecondaryText="et bien d’autres encore !"
					content="Grâce à notre simulateur, découvrez les aides auxquelles vous avez droit
            pour votre logement mais aussi votre mobilité, vos vacances, votre santé... et bien plus encore !
            Tout cela à portée de clic et en moins de 5 minutes."
					buttonLabel="Je découvre mes aides"
					buttonHref="/mes-aides"
					imgSrc="/images/aides-au-logement.webp"
					additionalInformation={additionalInformation()}
				/>
				<div className={classNames(styles.contentWrapper, 'background-white-lilac')}>
					<Container>
						<section className={styles.section}>
							<h2 className={styles.sectionHeading}>Découvrez vos aides :</h2>
							<ul aria-label="Vos aides">
								<li className={styles.partnerCard}>
									<PartnerCard
										logo="/images/logos/caisse-allocations-familiales.svg"
										link="https://wwwd.caf.fr/wps/portal/caffr/aidesetdemarches/mesdemarches/faireunesimulation/lelogement#/preparation"
										linkLabel="Tester mon éligibilité pour les aides au logement de la CAF"
										title="Vous dépendez du régime général ? Demandez vos aides à la CAF !"
									>
										La CAF signifie Caisse d’Allocation Familiales. Il y en a
										dans chaque département. Son rôle est de verser les aides
										qui concernent la famille, le logement mais aussi une partie
										des aides destinées à lutter contre la pauvreté, comme le
										RSA ou la Prime d’activité.
									</PartnerCard>
								</li>
								<li className={styles.partnerCard}>
									<PartnerCard
										logo="/images/logos/mutualite-sociale-agricole.svg"
										link="https://www.msa.fr/lfp/web/msa/logement/offre-msa"
										linkLabel="Découvrir les aides au logement de la MSA"
										title="Vous dépendez du régime agricole ? Demandez vos aides à la MSA !"
									>
										La MSA signifie Mutualité Sociale Agricole, c’est le régime
										de protection sociale obligatoire pour toute personne du
										secteur agricole. Son rôle est donc de verser à tous ses
										adhérents les aides dont ils pourraient avoir besoin :
										maladie, maternité, retraite...mais aussi logement !
									</PartnerCard>
								</li>
							</ul>
						</section>
						<section className={styles.section}>
							<h2 className={styles.sectionHeading}>Tout ce qu‘il faut savoir :</h2>
							<ul aria-label="Ce qu‘il faut savoir" className={styles.articleList}>
								<li>
									<ArticleCard
										imageSrc="/images/articles/documents.svg"
										imageFit="contain"
										link="/articles/comment-constituer-un-dossier-locatif"
										titleLabel="Comment constituer un dossier locatif ?">
										<p className={styles.articleCardDescription}>Constituer son dossier locatif peut sembler compliqué,
											surtout si c’est la première fois ! Vous vous demandez comment vous y prendre ?
											Quels documents rassembler ? Suivez le guide !</p>
									</ArticleCard>
								</li>
								<li>
									<ArticleCard
										imageSrc="/images/articles/consultative-sales.svg"
										imageFit="contain"
										link="/articles/les-garants-a-quoi-ca-sert-et-vers-qui-me-tourner"
										titleLabel="Les garants : à quoi ça sert et vers qui me tourner ?">
										<p className={styles.articleCardDescription}>Vous préparez votre dossier locatif et vous vous
											demandez quel est le rôle d’un garant et comment en trouver un ?
											On vous explique tout pour que vous trouviez une solution adaptée à votre situation.</p>
									</ArticleCard>
								</li>
								<li>
									<ArticleCard
										imageSrc="/images/articles/product-quality.svg"
										imageFit="contain"
										link="/articles/quelles-sont-les-aides-pour-financer-un-logement"
										titleLabel="Quelles sont les aides pour payer un logement ?">
										<p className={styles.articleCardDescription}>Il existe plusieurs dispositifs pour vous aider à
											financer votre loyer tous les mois et vous soutenir au moment de votre installation.
											Comment savoir à quelles aides vous pouvez accéder ? On vous dit tout !</p>
									</ArticleCard>
								</li>
							</ul>
						</section>
					</Container>
				</div>
			</main>
		</>
	);
}

function additionalInformation() {
	return (
		<div className={styles.additionalInfo}>
			<Icon name="information"/>
			<span>Avant de démarrer la simulation de vos aides, pensez à vous munir de vos ressources et de celles de vos
        parents si vous êtes encore à leur charge.</span>
		</div>
	);
}
