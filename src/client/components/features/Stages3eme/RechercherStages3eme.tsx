import { Head } from '~/client/components/head/Head';
import { LightHero, LightHeroPrimaryText, LightHeroSecondaryText } from '~/client/components/ui/Hero/LightHero';

export default function RechercherStages3eme() {
	return <>
		<Head
			title="Rechercher un stage de 3ème | 1jeune1solution"
			description="Des milliers d’entreprises prêtes à vous accueillir pour votre stage de 3ème"
			robots="index,follow"
		/>
		<main id="contenu">
			<LightHero>
				<h1>
					<LightHeroPrimaryText>Des milliers d’entreprises prêtes à vous accueillir</LightHeroPrimaryText>
					<LightHeroSecondaryText>pour votre stage de 3ème</LightHeroSecondaryText>
				</h1>
			</LightHero>
		</main>
	</>;
}
