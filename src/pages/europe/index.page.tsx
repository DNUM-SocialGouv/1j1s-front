import classNames from 'classnames';
import Image from 'next/legacy/image';
import React from 'react';

import { Container } from '~/client/components/layouts/Container/Container';
import { Link as LinkType } from '~/client/components/props';
import { LightHero } from '~/client/components/ui/Hero/LightHero';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { Link } from '~/client/components/ui/Link/Link';
import { TextIcon } from '~/client/components/ui/TextIcon/TextIcon';
import { HeadTag } from '~/client/components/utils/HeaderTag';
import useBreakpoint from '~/client/hooks/useBreakpoint';
import styles from '~/pages/europe/europe.module.scss';

export default function EuropePage() {
	const { isLargeScreen } = useBreakpoint();
	const MAIL_TO = 'contact-1j1s@sg.social.gouv.fr';
	const linkList: Array<LinkType> = [
		{
			title: 'Je cherche un emploi en Europe',
			url: 'https://ec.europa.eu/eures/portal/jv-se/home',
		},
		{
			title: 'Je souhaite faire une partie de mon apprentissage en Europe',
			url: 'https://www.euroappmobility.eu/fr/',
		},
		{
			title: 'Je cherche un Volontariat International (V.I.E / V.I.A)',
			url: 'https://mon-vie-via.businessfrance.fr/',
		},
		{
			title: 'Je souhaite m’engager dans une mission de solidarité en Europe',
			url: 'https://europa.eu/youth/solidarity/young-people/volunteering_fr ',
		},
	];

	const sectionExperienceEurope = () => (
		<div className={'background-white-lilac'} >
			<Container className={styles.sectionExperienceEurope}>
				<LightHero
					primaryText="Je cherche une expérience"
					secondaryText="en Europe"/>
				<p>
          Trouvez des offres d’emploi, de stage et des volontariats internationaux au sein de pays Européens ainsi que des aides financières afin de partir à la découverte de nouvelles opportunités et de nouveaux pays !
				</p>
				<span className={styles.sectionExperienceEurope__Information}>
					<Icon name="information"/>
					<p>
            Si vous êtes accompagné-e en mission locale, rapprochez-vous de votre conseiller pour en savoir plus sur les mobilités courtes
					</p>
				</span>
			</Container>
		</div>
	);

	const sectionLiens = () => (
		<div>
			<Container className={styles.sectionLiens}>
				{ isLargeScreen && (
					<div className={styles.imageWrapper}>
						<Image src="/images/europe.webp" alt="" layout="fill" objectFit="cover" objectPosition="center"/>
					</div>
				) }
				<ul>
					{ linkList.map((link: LinkType) => (
						<li key={link.title}>
							<Link href={link.url} className={classNames('underline-none')}>
								<TextIcon
									text={link.title}
									icon={<Icon name="external-redirection"/>}
								/>
							</Link>
						</li>
					))}
				</ul>
			</Container>
		</div>
	);

	const sectionDispositif = () => (
		<div className={'background-white-lilac'}>
			<LightHero
				primaryText={'Je découvre les dispositifs pour '}
				secondaryText={'m’accompagner dans mon projet'}
				titleAs={'h2'}
				className={styles.sectionDispositif__Title}
			/>
			<Container className={styles.sectionDispositif}>
				<div className={styles.sectionDispositif__CardWrapper}>
					<article className={styles.sectionDispositif__Card}>
						<h3>Le programme de mobilité ciblé EURES</h3>
						<ul aria-label="Foire aux questions" className={styles.sectionDispositif__CardList}>
							<li className={styles.sectionDispositif__CardContent}>
								{ isLargeScreen && <Icon name='arrow-right'/>}
								<div>
									<h4>Comment cela fonctionne ?</h4>
									<p>Il vous aide à trouver un emploi, une formation ou un apprentissage dans un autre État membre de l’Union européenne.</p>
								</div>
							</li>
							<li className={styles.sectionDispositif__CardContent}>
								{ isLargeScreen && <Icon name='arrow-right'/>}
								<div>
									<h4>Pour qui ?</h4>
									<p>Tout demandeur d’emploi de plus de 18 ans; indépendamment de ses qualifications.</p>
								</div>
							</li>
							<li className={styles.sectionDispositif__CardContent}>
								{ isLargeScreen && <Icon name='arrow-right'/>}
								<div>
									<h4>Pour quelle durée ?</h4>
									<p>
										<span>Contrat de 3 mois minimum pour les stages</span>
										<span>Contrat de 6 mois minimum pour les emplois ou les apprentissages.</span>
									</p>
								</div>
							</li>
							<li className={styles.sectionDispositif__CardContent}>
								{ isLargeScreen && <Icon name='arrow-right'/>}
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
							<Link href="https://ec.europa.eu/eures/public/eures-services/eures-targeted-mobility-scheme_fr" appearance="asPrimaryButton">En savoir plus</Link>
						</div>

					</article>

					<article className={styles.sectionDispositif__Card}>
						<h3>Le programme “ERASMUS+”</h3>
						<p>Entre 200 et 600 euros par mois selon le pays où vous effectuez votre mobilité d’études.</p>
						<ul aria-label="Foire au questions" className={styles.sectionDispositif__CardList}>
							<li className={styles.sectionDispositif__CardContent}>
								{ isLargeScreen && <Icon name='arrow-right'/>}
								<div>
									<h4>Comment cela fonctionne ?</h4>
									<p> Il vous donne la possibilité de séjourner à l’étranger pour renforcer vos compétences et accroître votre employabilité.</p>
								</div>
							</li>
							<li className={styles.sectionDispositif__CardContent}>
								{ isLargeScreen && <Icon name='arrow-right'/>}
								<div>
									<h4>Pour qui ?</h4>
									<p>Tout public</p>
								</div>
							</li>
							<li className={styles.sectionDispositif__CardContent}>
								{ isLargeScreen && <Icon name='arrow-right'/>}
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
								{ isLargeScreen && <Icon name='arrow-right'/>}
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
							<Link href="https://info.erasmusplus.fr/" appearance="asPrimaryButton">En savoir plus</Link>
						</div>

					</article>
				</div>
			</Container>
		</div>
	);

	const sectionAidesFinancieres = () => (
		<div>
			<Container className={styles.sectionAidesFinancieres}>
				<h2>Je cherche des aides financières pour vivre une expérience en Europe</h2>
				<div className={styles.buttonWrapper}>
					<Link href="/mes-aides" appearance="asPrimaryButton">Faire une simulation d’aides</Link>
				</div>
			</Container>
		</div>
	);

	const sectionNiveauAnglais = () => (
		<div className={!isLargeScreen ? 'background-primary' : 'background-gradient-to-primary'}>
			<Container className={styles.sectionNiveauAnglais}>
				{ isLargeScreen
					? (
						<div className={styles.sectionNiveauAnglais__ImageWrapper}>
							<div className={styles.logoWrapper}>
								<Image src={'/images/logos/wall-street-english-blue.svg'} alt="" layout="fill" objectFit="cover" objectPosition="top" aria-hidden="true"/>
							</div>
						</div>
					)
					: (
						<div className={styles.logoWrapper}>
							<Image src={'/images/logos/wall-street-english.svg'} alt="" layout="fill" objectFit="cover" objectPosition="top" aria-hidden="true"/>
						</div>
					)
				}

				<div className={styles.sectionNiveauAnglais__Content}>
					<h2>
						<strong>J’évalue mon niveau </strong>
            d’anglais grâce à un
						<strong> test gratuit </strong>
            avec “Wall Street English”
					</h2>
					<p>Quel est mon niveau d‘anglais ? Rien de plus simple avec le test en ligne de Wall Street English. Vous êtes évalué sur votre niveau de grammaire, de vocabulaire, de compréhension écrite et orale.</p>
					<div className={styles.buttonWrapper}>
						<Link href="https://lp.wallstreetenglish.fr/1jeune-1solution" appearance="asPrimaryButton" className={styles.buttonOnDarkBackground}>Je veux me tester</Link>
					</div>
					<span>Vous êtes une entreprise et souhaitez vous aussi proposer un test en ligne, <Link href={`mailto:${MAIL_TO}`}>écrivez-nous</Link>.</span>
				</div>
			</Container>
		</div>
	);

	return (
		<>
			<HeadTag title={'Trouver un emploi ou un volontariat en Europe  | 1jeune1solution'} />
			<main id="contenu">
				{sectionExperienceEurope()}
				{sectionLiens()}
				{sectionDispositif()}
				{sectionAidesFinancieres()}
				{sectionNiveauAnglais()}
			</main>
		</>
	);
}

