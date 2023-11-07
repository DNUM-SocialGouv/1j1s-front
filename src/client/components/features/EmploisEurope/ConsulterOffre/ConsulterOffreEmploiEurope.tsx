import commonStyles from '~/client/components/features/ConsulterOffre.module.scss';
import { ConsulterOffreLayout } from '~/client/components/layouts/ConsulterOffre/ConsulterOffreLayout';
import { EmploiEurope } from '~/server/emplois-europe/domain/emploiEurope';

interface ConsulterOffreEmploiEuropeProps {
  annonceEmploiEurope: EmploiEurope
}

export function DetailEmploiEurope({ annonceEmploiEurope }: ConsulterOffreEmploiEuropeProps) {
	return (
		<ConsulterOffreLayout>
			<header className={commonStyles.titre}>
				<h1>{annonceEmploiEurope.titre || 'Offre d’emploi sans titre'}</h1>
				{annonceEmploiEurope.nomEntreprise && <p className={commonStyles.sousTitre}>{annonceEmploiEurope.nomEntreprise}</p>}
			</header>
			<section className={commonStyles.contenu}>
			</section>
		</ConsulterOffreLayout>
	);
}
