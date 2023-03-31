import React, { useState } from 'react';

import { ConsulterOffreLayout } from '~/client/components/layouts/ConsulterOffre/ConsulterOffreLayout';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { Link } from '~/client/components/ui/Link/Link';
import { ModalComponent } from '~/client/components/ui/Modal/ModalComponent';
import { TagList } from '~/client/components/ui/Tag/TagList';
import { useLocale } from '~/client/context/locale.context';
import { Alternance, isMatcha, isPoleEmploi } from '~/server/alternances/domain/alternance';

import styles from './Detail.module.scss';

function toISODate(date: Date) {
	return date.toISOString().split('T')[0];
}

export function Detail({ annonce }: { annonce: Alternance }) {
	const locale = useLocale();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const toggleModal = () => setIsModalOpen(!isModalOpen);

	return (
		<ConsulterOffreLayout>
			<header className={styles.entete}>
				<h1>{annonce.titre}</h1>
				{annonce.entreprise.nom && <p className={styles.sousTitre}>{annonce.entreprise.nom}</p>}
				<TagList className={styles.tags} list={annonce.tags}/>
				{isPoleEmploi(annonce.source) && annonce.lienPostuler &&
            <Link appearance={'asPrimaryButton'} type={'external'} href={annonce.lienPostuler} className={styles.postuler}>Postuler sur Pôle emploi</Link>
				}
				{isMatcha(annonce.source) && annonce.id &&
            <ButtonComponent
            	appearance={'primary'}
            	icon={<Icon name="arrow-right"/>}
            	iconPosition="right"
            	className={styles.postuler}
            	label={'Postuler'}
            	onClick={() => toggleModal()}
            />
				}
			</header>
			<section>
				<dl className={styles.contenu}>
					{annonce.description && (
						<div className={styles.description}>
							<dt>Description du poste</dt>
							<dd>{annonce.description}</dd>
						</div>)}
					{annonce.compétences && annonce.compétences.length > 0 && (
						<div>
							<dt>Connaissances et compétences requises</dt>
							<dd>
								<ul>
									{annonce.compétences.map((compétence) => (
										<li key={compétence}>{compétence}</li>
									))}
								</ul>
							</dd>
						</div>
					)}
					<div>
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
									<time dateTime={toISODate(annonce.dateDébut)}>{annonce.dateDébut.toLocaleDateString(locale, { dateStyle: 'long' })}</time>
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
					</div>
					{(annonce.entreprise.téléphone || annonce.entreprise.adresse) && (
						<div>
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
			<ModalComponent close={toggleModal} isOpen={isModalOpen} className={styles.modale}>
				<ModalComponent.Content>
					<iframe
						src={annonce.lienPostuler}
						title="Formulaire de candidature à l’annonce"
						className={styles.iframe}
						tabIndex={0}
					/>
				</ModalComponent.Content>
			</ModalComponent>
		</ConsulterOffreLayout>
	);
}
