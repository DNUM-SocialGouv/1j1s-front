import { Container } from '~/client/components/layouts/Container/Container';
import { LightHero, LightHeroPrimaryText, LightHeroSecondaryText } from '~/client/components/ui/Hero/LightHero';
import { Icon } from '~/client/components/ui/Icon/Icon';

import styles from '../EmploiEnEuropeContent.module.scss';

export function ExperiencesEnEurope() {
	return (
		<div className={'background-white-lilac'}>
			<Container className={styles.sectionExperienceEurope}>
				<LightHero>
					<h1>
						<LightHeroPrimaryText>Je cherche une expérience</LightHeroPrimaryText>
						<LightHeroSecondaryText>en Europe</LightHeroSecondaryText>
					</h1>
				</LightHero>
				<p>
          Trouvez des offres d’emploi, de stage et des volontariats internationaux au sein de pays Européens ainsi que
          des aides financières afin de partir à la découverte de nouvelles opportunités et de nouveaux pays !
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
}
