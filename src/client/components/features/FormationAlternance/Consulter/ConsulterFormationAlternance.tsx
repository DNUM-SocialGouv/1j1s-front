import commonStyles from '~/client/components/features/ConsulterOffre.module.scss';
import { ConsulterOffreLayout } from '~/client/components/layouts/ConsulterOffre/ConsulterOffreLayout';
import { Link } from '~/client/components/ui/Link/Link';
import { TagList } from '~/client/components/ui/Tag/TagList';
import { Formation } from '~/server/formations/domain/formation';
import { Statistique } from '~/server/formations/domain/statistique';

import {
	StatistiquesFormationAlternance,
} from './Statistiques/StatistiquesFormationAlternance';

export function ConsulterFormationAlternance({ formation, statistiques }: { formation: Formation, statistiques?: Statistique }) {
	const displayInformationCentreFormation = !!formation.adresse.adresseComplete;
	return (
		<>
			<ConsulterOffreLayout>
				<header className={commonStyles.titre}>
					{formation.titre && <h1>{formation.titre}</h1>}
					{formation.nomEntreprise && <h2>{formation.nomEntreprise}</h2>}
					<TagList list={formation.tags} />
					{formation.lienDemandeRendezVous && (
						<Link href={formation.lienDemandeRendezVous}
							className={commonStyles.postuler}
							appearance={'asPrimaryButton'}
						>
							Contacter l’établissement
							<Link.Icon />
						</Link>
					)}
				</header>
				<section className={commonStyles.contenu}>
					{formation.description && (
						<>
							<h3>Description de la formation :</h3>
							<p>{formation.description}</p>
						</>
					)}
					{formation.objectif && (
						<>
							<h3>Objectifs de la formation :</h3>
							<p>{formation.objectif}</p>
						</>
					)}
					{formation.dureeIndicative && (
						<>
							<h3>Durée de la formation :</h3>
							<p>{formation.dureeIndicative}</p>
						</>
					)}
					{displayInformationCentreFormation && (
						<>
							<h3>Informations sur le centre de formation :</h3>
							{formation.adresse.adresseComplete &&
								<p>Adresse : {formation.adresse.adresseComplete}</p>
							}
						</>
					)}
				</section>
			</ConsulterOffreLayout>
			<StatistiquesFormationAlternance statistiques={statistiques} />
		</>
	);
}
