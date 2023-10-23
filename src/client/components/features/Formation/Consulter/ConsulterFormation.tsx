import commonStyles from '~/client/components/features/ConsulterOffre.module.scss';
import {
	StatistiquesFormation,
} from '~/client/components/features/Formation/Consulter/Statistiques/StatistiquesFormation';
import { ConsulterOffreLayout } from '~/client/components/layouts/ConsulterOffre/ConsulterOffreLayout';
import { LinkStyledAsButtonWithIcon } from '~/client/components/ui/LinkStyledAsButton/LinkStyledAsButton';
import { TagList } from '~/client/components/ui/Tag/TagList';
import { Formation } from '~/server/formations/domain/formation';
import { Statistique } from '~/server/formations/domain/statistique';

export function ConsulterFormation({ formation, statistiques }: { formation: Formation, statistiques?: Statistique }) {
	const displayInformationCentreFormation = !!formation.adresse.adresseComplete;
	return (
		<>
			<ConsulterOffreLayout>
				<header className={commonStyles.titre}>
					{formation.titre && <h1>{formation.titre}</h1>}
					{formation.nomEntreprise && <h2>{formation.nomEntreprise}</h2>}
					<TagList list={formation.tags} />
					{formation.lienDemandeRendezVous &&
						<LinkStyledAsButtonWithIcon type={'external'} href={formation.lienDemandeRendezVous} className={commonStyles.postuler} appearance={'asPrimaryButton'}>
                            Contacter l’établissement
						</LinkStyledAsButtonWithIcon>
					}
				</header>
				<section className={commonStyles.contenu}>
					{formation.description &&
					  <>
					    <h3>Description de la formation :</h3>
						  <p>{formation.description}</p>
					  </>
					}
					{formation.objectif &&
						<>
							<h3>Objectifs de la formation :</h3>
							<p>{formation.objectif}</p>
						</>
					}
					{formation.dureeIndicative &&
						<>
							<h3>Durée de la formation :</h3>
							<p>{formation.dureeIndicative}</p>
						</>
					}
					{displayInformationCentreFormation &&
						<>
							<h3>Informations sur le centre de formation :</h3>
							{formation.adresse.adresseComplete &&
								<p>Adresse : {formation.adresse.adresseComplete}</p>
							}
						</>
					}
				</section>
			</ConsulterOffreLayout>
			<StatistiquesFormation statistiques={statistiques}/>
		</>
	);
}
