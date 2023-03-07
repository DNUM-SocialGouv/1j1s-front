import React from 'react';

import { DetailAlternance } from '~/client/components/features/Alternance/Detail/DetailAlternance.type';
import { ConsulterOffreLayout } from '~/client/components/layouts/ConsulterOffre/ConsulterOffreLayout';
import { TagList } from '~/client/components/ui/Tag/TagList';
import { useLocale } from '~/client/context/locale.context';

import styles from './Detail.module.scss';

function toISODuration(duration: number) {
	return `P${duration}Y`;
}

function toISODate(date: Date) {
	return date.toISOString().split('T')[0];
}

export function Detail({ annonce }: { annonce: DetailAlternance }) {
	const locale = useLocale();
	return (
		<ConsulterOffreLayout>
			<header className={styles.entete}>
				<h1>{annonce.titre}</h1>
				{annonce.entreprise.nom && <p className={styles.sousTitre}>{annonce.entreprise.nom}</p>}
				<TagList className={styles.tags} list={[annonce.localisation, annonce.typeDeContrat, annonce.niveauRequis]} />
			</header>
			<dl className={styles.contenu}>
				{annonce.description && (
					<div className={styles.description}>
						<dt>Description du contrat</dt>
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
							<dt>Niveau requis</dt>
							<dd>{annonce.niveauRequis}</dd>
						</div>
					)}
					{annonce.dateDébut && (
						<div className={styles.dateDebut}>
							<dt>Début du contrat</dt>
							<dd>
								<time dateTime={toISODate(annonce.dateDébut)}>{annonce.dateDébut.toLocaleDateString(locale, { dateStyle: 'long' } as Intl.DateTimeFormatOptions)}</time></dd>
						</div>
					)}
					{annonce.typeDeContrat && (
						<div className={styles.typeContrat}>
							<dt>Type de contrat</dt>
							<dd>{annonce.typeDeContrat}</dd>
						</div>
					)}
					{annonce.durée && (
						<div className={styles.duree}>
							<dt>Durée du contrat</dt>
							<dd>
								<time dateTime={toISODuration(annonce.durée)}>{annonce.durée} {annonce.durée > 1 ? 'ans' : 'an'}</time></dd>
						</div>
					)}
					{annonce.rythmeAlternance && (
						<div className={styles.rythme}>
							<dt>Rythme de l’alternance</dt>
							<dd>{annonce.rythmeAlternance}</dd>
						</div>
					)}
				</div>
				{(annonce.entreprise.téléphone || annonce.entreprise.localisation) && (
					<div>
						<dt>Informations sur l’entreprise</dt>
						<dd>
							<dl>
								{annonce.entreprise.localisation && (
									<div className={styles.adresse}>
										<dt>Adresse</dt>
										<dd>{annonce.entreprise.localisation}</dd>
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
		</ConsulterOffreLayout>
	);
}
