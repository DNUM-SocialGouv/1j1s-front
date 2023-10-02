import { Container } from '~/client/components/layouts/Container/Container';
import { LightHero, LightHeroPrimaryText, LightHeroSecondaryText } from '~/client/components/ui/Hero/LightHero';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { LinkStyledAsButton } from '~/client/components/ui/LinkStyledAsButton/LinkStyledAsButton';
import useBreakpoint from '~/client/hooks/useBreakpoint';

import styles from '../EmploiEnEuropeContent.module.scss';

function CardEures() {
	return (
		<li aria-labelledby="eures">
			<h3 id="eures">Le programme de mobilité ciblé EURES</h3>
			<dl>
				<dt>Comment cela fonctionne ?</dt>
				<dd>Il vous aide à trouver un emploi, une formation ou un apprentissage dans un autre État membre de l’Union
				européenne.</dd>
				<dt>Pour qui ?</dt>
				<dd>Tout demandeur d’emploi de plus de 18 ans ; indépendamment de ses qualifications.</dd>
				<dt>Pour quelle durée ?</dt>
				<dd>Contrat de 3 mois minimum pour les stages</dd>
				<dd>Contrat de 6 mois minimum pour les emplois ou les apprentissages.</dd>
				<dt>Quelles aides ?</dt>
				<dd>Aide dans la recherche d’emploi.</dd>
				<dd>Soutien financier pour passer un entretien à l’étranger, pour la prise en charge de frais tels que des cours
				de langue, la reconnaissance de leurs qualifications ou leur déménagement.
				</dd>
			</dl>
			<LinkStyledAsButton
				appearance="asPrimaryButton"
				href="https://ec.europa.eu/eures/public/eures-services/eures-targeted-mobility-scheme_fr"
				aria-label="En savoir plus sur EURES"
			>
			En savoir plus
			</LinkStyledAsButton>
		</li>
	);
}

function CardErasmus() {
	return (
		<li aria-labelledby="erasmus">
			<h3 id="erasmus">Le programme “ERASMUS+”</h3>
			<p>Entre 200 et 600 euros par mois selon le pays où vous effectuez votre mobilité d’études.</p>
			<dl>
				<dt>Comment cela fonctionne ?</dt>
				<dd>Il vous donne la possibilité de séjourner à l’étranger pour renforcer vos compétences et accroître votre employabilité.</dd>
				<dt>Pour qui ?</dt>
				<dd>Tout public</dd>
				<dt>Pour quelle durée ?</dt>
				<dd>Étudiants : de 3 à 12 mois par cycle universitaire.</dd>
				<dd>Stage : de 2 à 12 mois.</dd>
				<dd>Formation professionnelle : de 1 à 360 jours.</dd>
				<dt>Quelles aides ?</dt>
				<dd>
					Aides financières cumulables avec les bourses d’études, l’aide à la mobilité internationale (AMI) et les aides régionales/départementales et qui varient selon le type de mobilité et la destination :
					<ul>
						<li>Étudiants : entre 200 et 600 €/mois.</li>
						<li>Stage : entre 300 et 450 €/mois.</li>
						<li>Formation professionnelle : 32 à 43 €/jour selon le pays de mobilité pendant 2 semaines puis 22 à 30 €/jour selon le pays de mobilité pour le reste de la mobilité.</li>
					</ul>
				</dd>
			</dl>
			<LinkStyledAsButton
				appearance="asPrimaryButton"
				href="https://info.erasmusplus.fr/"
				aria-label="En savoir plus sur ERASMUS+"
			>
				En savoir plus
			</LinkStyledAsButton>
		</li>
	);
}

function CardAidesFinancieres() {
	return (
		<li aria-labelledby="aides-financieres">
			<h3 id="aides-financieres">Vous cherchez une aide financière pour vivre une expérience en Europe ?</h3>
			<p>Découvrez le simulateur d’aides financières sur 1jeune1solution</p>
			<LinkStyledAsButton appearance="asPrimaryButton" href="/mes-aides">
				Faire une simulation d’aides
			</LinkStyledAsButton>
		</li>
	);
}

export function Dispositifs() {
	return (
		<section className={styles.dispositifs}>
			<h2>Je découvre les dispositifs pour m’accompagner dans mon projet</h2>
			<ul className={styles.cards}>
				<CardEures/>
				<CardErasmus/>
				<CardAidesFinancieres/>
			</ul>
		</section>
	);
}
export function DispositifsDep() {
	// FIXME (GAFI 18-09-2023): Passer par du CSS ...
	const { isLargeScreen } = useBreakpoint();

	return (
		<div className={'background-white-lilac'}>
			<LightHero>
				<h2>
					<LightHeroPrimaryText>Je découvre les dispositifs pour</LightHeroPrimaryText>
					<LightHeroSecondaryText>m’accompagner dans mon projet</LightHeroSecondaryText>
				</h2>
			</LightHero>
			<Container className={styles.sectionDispositif}>
				<div className={styles.sectionDispositif__CardWrapper}>
					<div className={styles.sectionDispositif__Card}>
						<h3>Le programme de mobilité ciblé EURES</h3>
						<ul aria-label="Foire aux questions" className={styles.sectionDispositif__CardList}>
							<li className={styles.sectionDispositif__CardContent}>
								{isLargeScreen && <Icon name="arrow-right"/>}
								<div>
									<h4>Comment cela fonctionne ?</h4>
									<p>Il vous aide à trouver un emploi, une formation ou un apprentissage dans un autre État membre de
                    l’Union européenne.</p>
								</div>
							</li>
							<li className={styles.sectionDispositif__CardContent}>
								{isLargeScreen && <Icon name="arrow-right"/>}
								<div>
									<h4>Pour qui ?</h4>
									<p>Tout demandeur d’emploi de plus de 18 ans; indépendamment de ses qualifications.</p>
								</div>
							</li>
							<li className={styles.sectionDispositif__CardContent}>
								{isLargeScreen && <Icon name="arrow-right"/>}
								<div>
									<h4>Pour quelle durée ?</h4>
									<p>
										<span>Contrat de 3 mois minimum pour les stages</span>
										<span>Contrat de 6 mois minimum pour les emplois ou les apprentissages.</span>
									</p>
								</div>
							</li>
							<li className={styles.sectionDispositif__CardContent}>
								{isLargeScreen && <Icon name="arrow-right"/>}
								<div>
									<h4>Quelles aides ?</h4>
									<p>
										<span>Aide dans la recherche d‘emploi.</span>
										<span>Soutien financier pour passer un entretien à l‘étranger, pour la prise en charge de frais tels que des cours de langue, la reconnaissance de leurs qualifications ou leur déménagement.</span>
									</p>
								</div>
							</li>
						</ul>

						<div className={styles.buttonWrapper}>
							<LinkStyledAsButton
								href="https://ec.europa.eu/eures/public/eures-services/eures-targeted-mobility-scheme_fr"
								appearance="asPrimaryButton">
                En savoir plus
							</LinkStyledAsButton>
						</div>

					</div>

					<div className={styles.sectionDispositif__Card}>
						<h3>Le programme “ERASMUS+”</h3>
						<p>Entre 200 et 600 euros par mois selon le pays où vous effectuez votre mobilité d’études.</p>
						<ul aria-label="Foire au questions" className={styles.sectionDispositif__CardList}>
							<li className={styles.sectionDispositif__CardContent}>
								{isLargeScreen && <Icon name="arrow-right"/>}
								<div>
									<h4>Comment cela fonctionne ?</h4>
									<p> Il vous donne la possibilité de séjourner à l’étranger pour renforcer vos compétences et accroître
                    votre employabilité.</p>
								</div>
							</li>
							<li className={styles.sectionDispositif__CardContent}>
								{isLargeScreen && <Icon name="arrow-right"/>}
								<div>
									<h4>Pour qui ?</h4>
									<p>Tout public</p>
								</div>
							</li>
							<li className={styles.sectionDispositif__CardContent}>
								{isLargeScreen && <Icon name="arrow-right"/>}
								<div>
									<h4>Pour quelle durée ?</h4>
									<p>
										<span><u>Étudiants </u> : de 3 à 12 mois par cycle universitaire.</span>
										<span><u>Stage </u> : de 2 à 12 mois.</span>
										<span><u>Formation professionnelle </u>: de 1 à 360 jours.</span>
									</p>
								</div>
							</li>
							<li className={styles.sectionDispositif__CardContent}>
								{isLargeScreen && <Icon name="arrow-right"/>}
								<div>
									<h4>Quelles aides ?</h4>
									<p>
										<span>Aides financières cumulables avec les bourses d’études, l’aide à la mobilité internationale (AMI) et les aides régionales/départementales et qui varient selon le type de mobilité et la destination :</span>
										<span><u>Étudiants</u> : entre 200 et 600 € / mois.</span>
										<span><u>Stage</u> : entre 300 et 450 € / mois.</span>
										<span><u>Formation professionnelle</u> : 32 à 43 €/jour selon le pays de mobilité pendant 2 semaines puis 22 à 30 €/jour selon le pays de mobilité pour le reste de la mobilité.</span>
									</p>
								</div>
							</li>
						</ul>
						<div className={styles.buttonWrapper}>
							<LinkStyledAsButton href="https://info.erasmusplus.fr/" appearance="asPrimaryButton">En savoir plus</LinkStyledAsButton>
						</div>
					</div>
				</div>
			</Container>
		</div>
	);
}
