import { LightHero, LightHeroPrimaryText, LightHeroSecondaryText } from '~/client/components/ui/Hero/LightHero';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { LinkStyledAsButton } from '~/client/components/ui/LinkStyledAsButton/LinkStyledAsButton';

import styles from '../EmploiEnEuropeContent.module.scss';

export function ExperiencesEnEurope() {
	return (
		// FIXME (GAFI 21-09-2023): Virer la div et mettre le container sur la section
		<div className={'background-white-lilac'}>
			<section className={styles.experience}>
				<LightHero className={styles.hero}>
					<h1>
						<LightHeroPrimaryText>Je cherche une expérience</LightHeroPrimaryText>
						<LightHeroSecondaryText>en Europe</LightHeroSecondaryText>
					</h1>
				</LightHero>
				<p className={styles.description}>
					Trouvez des offres d’emploi, de stage et des volontariats internationaux au sein de pays Européens ainsi que
					des aides financières afin de partir à la découverte de nouvelles opportunités et de nouveaux pays !
				</p>
				<div className={styles.information}>
					<Icon name="information"/>
					<p>
						Si vous êtes accompagné·e en mission locale, rapprochez-vous de votre conseiller pour en savoir plus sur les mobilités courtes
					</p>
				</div>
				<LinkStyledAsButton href="https://ec.europa.eu/eures/portal/jv-se/home" appearance="asPrimaryButton">
					Trouver une offre d’emploi en Europe
				</LinkStyledAsButton>
			</section>
		</div>
	);
}
