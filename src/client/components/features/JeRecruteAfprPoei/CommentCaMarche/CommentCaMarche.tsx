import Image from 'next/image';
import React from 'react';

import { Container } from '~/client/components/layouts/Container/Container';

import styles from './CommentCaMarche.module.scss';

export function CommentCaMarche() {
	return <section className={styles.commentCaMarche}>
		<Container className={styles.container}>
			<div>
				<h2>Comment ça marche ?</h2>
				<ol>
					<li>Vous déposez votre offre d’emploi en ligne sur notre site ou en contractant votre conseiller</li>
					<li>Vous sélectionnez un candidat prêt à se former</li>
					<li>Vous définissez un parcours de formation seul ou avec Pôle Emploi</li>
					<li>Vous signez une convention avant le début de la formation</li>
					<li>Vous signez le contrat de travail après la réalisation du bilan et l’aide est versée</li>
				</ol>
			</div>
			<Image
				src="/illustrations/mentorat-citoyen.svg"
				className={styles.illustration}
				alt=""
				width={500}
				height={300}
			/>
		</Container>
	</section>;
}
