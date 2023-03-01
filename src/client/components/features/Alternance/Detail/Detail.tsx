import React from 'react';

import { DetailAlternance } from '~/client/components/features/Alternance/Detail/DetailAlternance.type';
import styles from '~/client/components/features/ConsulterOffre.module.scss';
import { Tag } from '~/client/components/ui/Tag/Tag';
import { TagList } from '~/client/components/ui/Tag/TagList';
import { useLocale } from '~/client/context/locale.context';

function toISODuration(duration: number) {
	return `P${duration}Y`;
}

function toISODate(date: Date) {
	return date.toISOString().split('T')[0];
}

export function Detail({ annonce }: { annonce: DetailAlternance }) {
	const locale = useLocale();
	return (
		<>
			<header className={styles.titre}>
				<h1>{annonce.titre}</h1>
				{annonce.entreprise.nom && <p className={styles.sousTitre}>{annonce.entreprise.nom}</p>}
				<TagList list={[annonce.localisation, annonce.typeDeContrat, annonce.niveauRequis]} />
			</header>
			<dl className={styles.contenu}>
				{annonce.description && (
					<>
						<dt>Description du contrat</dt>
						<dd>{annonce.description}</dd>
					</>)}
				{annonce.compétences && annonce.compétences.length > 0 && (
					<>
						<dt>Connaissances et compétences requises</dt>
						<dd>
							<ul>
								{annonce.compétences.map((compétence) => (
									<li key={compétence}>{compétence}</li>
								))}
							</ul>
						</dd>
					</>
				)}
				{annonce.niveauRequis && (
					<>
						<dt>Niveau requis</dt>
						<dd>{annonce.niveauRequis}</dd>
					</>
				)}
				{annonce.dateDébut && (
					<>
						<dt>Début du contrat</dt>
						<dd>
							<time dateTime={toISODate(annonce.dateDébut)}>{annonce.dateDébut.toLocaleDateString(locale, { dateStyle: 'long' })}</time></dd>
					</>
				)}
				{annonce.typeDeContrat && (
					<>
						<dt>Type de contrat</dt>
						<dd>{annonce.typeDeContrat}</dd>
					</>
				)}
				{annonce.durée && (
					<>
						<dt>Durée du contrat</dt>
						<dd>
							<time dateTime={toISODuration(annonce.durée)}>{annonce.durée} {annonce.durée > 1 ? 'ans' : 'an'}</time></dd>
					</>
				)}
				{annonce.rythmeAlternance && (
					<>
						<dt>Rythme de l’alternance</dt>
						<dd>{annonce.rythmeAlternance}</dd>
					</>
				)}
				{(annonce.entreprise.téléphone || annonce.entreprise.localisation) && (
					<>
						<dt>Informations sur l’entreprise</dt>
						<dd>
							<dl>
								{annonce.entreprise.localisation && (
									<>
										<dt>Adresse</dt>
										<dd>{annonce.entreprise.localisation}</dd>
									</>
								)}
								{annonce.entreprise.téléphone && (
									<>
										<dt>Contact</dt>
										<dd>{annonce.entreprise.téléphone}</dd>
									</>
								)}
							</dl>
						</dd>
					</>
				)}
			</dl>
		</>
	);
}
