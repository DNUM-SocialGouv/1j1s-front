import commonStyles from '~/client/components/features/ConsulterOffre.module.scss';
import {
	StatistiquesFormation,
} from '~/client/components/features/Formation/Consulter/Statistiques/StatistiquesFormation';
import { ConsulterOffreLayout } from '~/client/components/layouts/ConsulterOffre/ConsulterOffreLayout';
import { LinkStyledAsButton } from '~/client/components/ui/LinkStyledAsButton/LinkStyledAsButton';
import { TagList } from '~/client/components/ui/Tag/TagList';
import { Formation } from '~/server/formations/domain/formation';
import { Statistique } from '~/server/formations/domain/statistique';

export function ConsulterFormation({ formation, statistiques }: { formation: Formation, statistiques?: Statistique }) {
	const displayInformationCentreFormation = formation.adresse.adresseComplète || formation.contact.email || formation.contact.tel || formation.contact.url;
	return (
		<>
			<ConsulterOffreLayout>
				<header className={commonStyles.titre}>
					{formation.titre && <h1>{formation.titre}</h1>}
					{formation.nomEntreprise && <h2>{formation.nomEntreprise}</h2>}
					<TagList list={formation.tags} />
					{formation.lienDemandeRendezVous &&
						<LinkStyledAsButton type={'external'} href={formation.lienDemandeRendezVous} className={commonStyles.postuler} appearance={'asPrimaryButton'}>
							Demander un rendez-vous
						</LinkStyledAsButton>
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
					{formation.duréeIndicative &&
						<>
							<h3>Durée de la formation :</h3>
							<p>{formation.duréeIndicative}</p>
						</>
					}
					{(!!formation.nombreHeuresEnEntreprise || !!formation.nombreHeuresAuCentre) &&
						<>
							<h3>Modalités de l’alternance :</h3>
							{!!formation.nombreHeuresEnEntreprise &&
								<p>Heures en entreprise : {formation.nombreHeuresEnEntreprise}h</p>
							}
							{!!formation.nombreHeuresAuCentre &&
								<p>Heures en centre de formation : {formation.nombreHeuresAuCentre}h</p>
							}
						</>
					}
					{displayInformationCentreFormation &&
						<>
							<h3>Informations sur le centre de formation :</h3>
							{formation.adresse.adresseComplète &&
								<p>Adresse : {formation.adresse.adresseComplète}</p>
							}
							{formation.contact.email &&
								<p>Email : {formation.contact.email}</p>
							}
							{formation.contact.tel &&
							  <p>Téléphone : {formation.contact.tel}</p>
							}
							{formation.contact.url &&
						    <p>En savoir plus : {formation.contact.url}</p>
							}
						</>
					}
				</section>
			</ConsulterOffreLayout>
			<StatistiquesFormation statistiques={statistiques}/>
		</>
	);
}
