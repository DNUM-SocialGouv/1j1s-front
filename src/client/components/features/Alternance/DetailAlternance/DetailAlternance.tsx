import React, { useState } from 'react';

import { ConsulterOffreLayout } from '~/client/components/layouts/ConsulterOffre/ConsulterOffreLayout';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { Link } from '~/client/components/ui/Link/Link';
import { ModalComponent } from '~/client/components/ui/Modal/ModalComponent';
import { TagList } from '~/client/components/ui/Tag/TagList';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import useSanitize from '~/client/hooks/useSanitize';
import { DateService } from '~/client/services/date/date.service';
import { Alternance, isFranceTravail, isMatcha } from '~/server/alternances/domain/alternance';
import { AlternanceStatus } from '~/server/alternances/infra/status';

import styles from './DetailAlternance.module.scss';

function toISODate(date: Date) {
	return date.toISOString().split('T')[0];
}

export function DetailAlternance({ annonce }: { annonce: Alternance }) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const toggleModal = () => setIsModalOpen(!isModalOpen);

	const description = useSanitize(annonce.description);
	const descriptionEmployeur = useSanitize(annonce.descriptionEmployeur);

	const dateService = useDependency<DateService>('dateService');
	const dateFormated = annonce.dateDébut && dateService.formatToHumanReadableDate(annonce.dateDébut);

	function getTags(): Array<string> {
		const tags = [];
		if (annonce.localisation) tags.push(annonce.localisation);

		if (annonce.source === Alternance.Source.FRANCE_TRAVAIL) {
			tags.push(Alternance.Contrat.ALTERNANCE);
			if (annonce.typeDeContrat && annonce.typeDeContrat.length > 0) tags.push(...annonce.typeDeContrat);
			return tags;
		}

		if (annonce.typeDeContrat && annonce.typeDeContrat.length > 0) tags.push(...annonce.typeDeContrat);
		if (annonce.niveauRequis) tags.push(annonce.niveauRequis);
		return tags;
	}

	function StatusOffreMatcha() {
		const isOfferCanceled = annonce.status === AlternanceStatus.CANCELED;
		if (isOfferCanceled) {
			return <div className={styles.offerFilled}>offre déjà pourvue</div>;
		}
		return annonce.id && (
			<ButtonComponent
				appearance={'primary'}
				icon={<Icon name="arrow-right" />}
				iconPosition="right"
				className={styles.postuler}
				label={'Postuler'}
				onClick={() => toggleModal()} />
		);
	}

	return (
		<ConsulterOffreLayout>
			<header className={styles.entete}>
				<h1>{annonce.titre}</h1>
				{annonce.entreprise.nom && <p className={styles.sousTitre}>{annonce.entreprise.nom}</p>}
				<TagList aria-label="mots clés de l‘offre" className={styles.tags} list={getTags()} />
				{isFranceTravail(annonce.source) && annonce.lienPostuler && (
					<Link appearance={'asPrimaryButton'} href={annonce.lienPostuler} className={styles.postuler}>Postuler sur
						France Travail<Link.Icon /></Link>
				)}
				{isMatcha(annonce.source) && <StatusOffreMatcha />
				}
			</header>
			<section>
				<dl className={styles.contenu}>
					{annonce.description && (
						<div className={styles.description}>
							<dt>Description du poste</dt>
							<dd dangerouslySetInnerHTML={{ __html: description }} />
						</div>
					)}
					{annonce.descriptionEmployeur && (
						<div className={styles.descriptionEmployeur}>
							<dt>Description de l’entreprise</dt>
							<dd dangerouslySetInnerHTML={{ __html: descriptionEmployeur }} />
						</div>
					)}
					{annonce.compétences && annonce.compétences.length > 0 && (
						<div className={styles.competences}>
							<dt>Compétences types du métier</dt>
							<dd>
								<ul>
									{annonce.compétences.map((compétence) => (
										<li key={compétence}>{compétence}</li>
									))}
								</ul>
							</dd>
						</div>
					)}
					{annonce.niveauRequis && (
						<div className={styles.niveauRequis}>
							<dt>Niveau visé en fin d’études</dt>
							<dd>{annonce.niveauRequis}</dd>
						</div>
					)}
					{annonce.dateDébut && (
						<div className={styles.dateDebut}>
							<dt>Début du contrat</dt>
							<dd>
								<time dateTime={toISODate(annonce.dateDébut)}>{dateFormated}</time>
							</dd>
						</div>
					)}
					{annonce.natureDuContrat && annonce.natureDuContrat.length > 0 && (
						<div className={styles.natureContrat}>
							<dt>Nature du contrat</dt>
							<dd>{annonce.natureDuContrat}</dd>
						</div>
					)}
					{annonce.typeDeContrat && annonce.typeDeContrat.length > 0 && (
						<div className={styles.typeContrat}>
							<dt>Type de contrat</dt>
							<dd>{annonce.typeDeContrat.join(', ')}</dd>
						</div>
					)}
					{annonce.durée && (
						<div className={styles.duree}>
							<dt>Durée du contrat</dt>
							<dd>
								<time>{annonce.durée}</time>
							</dd>
						</div>
					)}
					{annonce.rythmeAlternance && (
						<div className={styles.rythme}>
							<dt>Rythme de l’alternance</dt>
							<dd>{annonce.rythmeAlternance}</dd>
						</div>
					)}
					{(annonce.entreprise.téléphone || annonce.entreprise.adresse) && ( //TODO remplacer row gap par margin ?
						<div className={styles.informationsEntreprise}>
							<dt>Informations sur l’entreprise</dt>
							<dd>
								<dl>
									{annonce.entreprise.adresse && (
										<div className={styles.adresse}>
											<dt>Adresse</dt>
											<dd>{annonce.entreprise.adresse}</dd>
										</div>
									)}
									{annonce.entreprise.téléphone && (
										<div className={styles.telephone}>
											<dt>Contact</dt>
											<dd>{annonce.entreprise.téléphone}</dd>
										</div>
									)}
								</dl>
							</dd>
						</div>
					)}
				</dl>
			</section>
			<ModalComponent close={toggleModal} isOpen={isModalOpen} aria-label="Formulaire de candidature à l’annonce">
				<ModalComponent.Content>
					<iframe
						src={annonce.lienPostuler}
						title="Formulaire de candidature à l’annonce"
						className={styles.iframe}
						tabIndex={0} />
				</ModalComponent.Content>
			</ModalComponent>
		</ConsulterOffreLayout>
	);
}
