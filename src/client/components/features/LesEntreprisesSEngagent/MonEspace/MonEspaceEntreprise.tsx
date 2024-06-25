import React from 'react';

import { Container } from '~/client/components/layouts/Container/Container';
import { LightHeroPrimaryText, LightHeroSecondaryText } from '~/client/components/ui/Hero/LightHero';
import { Image } from '~/client/components/ui/Img';
import { Link } from '~/client/components/ui/Link/Link';

import styles from './MonEspaceEntreprise.module.scss';

export function MonEspaceEntreprise() {
	const AUTHENTIFICATION_URL_LBA = `${process.env.NEXT_PUBLIC_LA_BONNE_ALTERNANCE_URL}espace-pro/authentification`;
	return (
		<section className={styles.monEspace}>
			<Container>
				<h1>
					<LightHeroPrimaryText>
						Les entreprises s‘engagent auprès de la jeunesse !
					</LightHeroPrimaryText>
				</h1>
				<div className={styles.entreprisesPourLaJeunesse}>
					<Image src="/icons/les-entreprises-s-engagent.svg" alt="" width={150} height={150}/>
					<h2>
						<LightHeroSecondaryText>
							<span>J‘accède à mon espace entreprise</span>
							Les entreprises s‘engagent
						</LightHeroSecondaryText>
					</h2>
					<p>
						<strong>
							Vous avez déjà rejoint la mobilisation &quot;Les entreprises s‘engagent&quot; pour les jeunes ?
						</strong>
						<span>
							Pour accéder à tous les services qui vous aideront à réaliser et valoriser vos engagements pour la
							jeunesse, connectez-vous à votre espace sur la plateforme &quot;Les entreprises s‘engagent&quot;.
						</span>
					</p>
					<div>
						<Link
							href="https://www.lesentreprises-sengagent.gouv.fr/login"
							appearance="asPrimaryButton">
							Se connecter
							<Link.Icon/>
						</Link>
						<Link
							appearance={'asQuaternaryButton'}
							href="/les-entreprises-s-engagent">
							<Link.Icon name="information"/>
							Pas encore inscrit ? Rejoignez la mobilisation
						</Link>
					</div>
					<Image
						src="/images/logos/la-bonne-alternance.svg"
						alt=""
						width={150}
						height={150}/>
					<h2>
						<LightHeroSecondaryText>
							Je gère mes offres d’emploi en alternance avec La Bonne Alternance
						</LightHeroSecondaryText>
					</h2>
					<p>
						<strong>
							Vous avez déjà publié une offre en alternance pour les jeunes ?
						</strong>
						<span>
							Connectez-vous à votre espace sur la plateforme &quot;La Bonne Alternance&quot; pour gérer vos offres
							actuelles ou en publier de nouvelles.
						</span>
					</p>
					<div>
						<Link href={AUTHENTIFICATION_URL_LBA} appearance="asPrimaryButton">Se connecter<Link.Icon/></Link>
					</div>
				</div>
			</Container>
		</section>
	);
}
