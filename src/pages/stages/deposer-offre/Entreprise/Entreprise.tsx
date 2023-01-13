import React from 'react';

import { Container } from '~/client/components/layouts/Container/Container';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import { InputArea } from '~/client/components/ui/Form/InputText/InputArea';
import { InputText } from '~/client/components/ui/Form/InputText/InputText';
import { Icon } from '~/client/components/ui/Icon/Icon';

import styles from './Entreprise.module.scss';

export default function Entreprise() {
	return (
		<>
			<div className={styles.content}>
				<Container className={styles.container}>
					<div className={styles.etape}>Etape 1 sur 3 : Votre entreprise</div>
					<form className={styles.formulaire}>
						<div className={styles.champsObligatoires}>
							<p>Les champs suivants sont obligatoires</p>
						</div>
						<div className={styles.bodyFormulaire}>
							<InputText
								label="Indiquez le nom de l’entreprise ou de l’employeur"
								name="companyName"
								placeholder="Exemple : Crédit Agricole, SNCF…"
								required
							/>
							<InputText
								label="Indiquez une adresse mail de contact"
								type="email"
								name="email"
								placeholder="Exemple : contactRH@exemple.com"
								required
							/>
							<InputArea
								className={styles.textArea}
								id="commentaire"
								label="Rédigez une courte description de l’entreprise (200 caractères maximum)"
								placeholder="Indiquez des informations sur votre entreprise : son histoire, des objectifs, des enjeux..."
								name="commentaire"
								required
								maxLength={200}
							/>
						</div>
						<div className={styles.champsFacultatifs}>
							<p>Les champs suivants sont facultatifs mais recommandés</p>
						</div>
						<div className={styles.bodyFormulaire}>
							<InputText
								label="Partagez le logo de l’entreprise - lien/URL"
								type="url"
								name="logo"
								placeholder="Exemple : https://www.1jeune1solution.gouv.fr/images/logos/r%C3..."
							/>
							<InputText
								label="Indiquez le lien du site de l’entreprise - lien/URL"
								type="url"
								name="site"
								placeholder="Exemple : https://1jeune1solution.gouv.fr"
							/>
						</div>
						<div className={styles.validation}>
							<ButtonComponent
								icon={<Icon name="angle-right"/>}
								iconPosition="right"
								label="Suivant"
								type="submit"
							/>
						</div>
					</form>
				</Container>
			</div>
		</>
	);
};
