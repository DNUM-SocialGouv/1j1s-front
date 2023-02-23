import { useRouter } from 'next/router';
import React, {
	FormEvent,
	useEffect,
	useRef,
	useState,
} from 'react';

import { Container } from '~/client/components/layouts/Container/Container';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import { InputArea } from '~/client/components/ui/Form/InputText/InputArea';
import { InputText } from '~/client/components/ui/Form/InputText/InputText';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { Tooltip } from '~/client/components/ui/Tooltip/Tooltip';
import useLocalStorage from '~/client/hooks/useLocalStorage';
import { OffreDeStageDéposée } from '~/pages/stages/deposer-offre/Formulaire/StageDeposerOffre';
import {
	ETAPE_ENTREPRISE,
	URL_DEPOSER_OFFRE,
} from '~/pages/stages/deposer-offre/index.page';

import styles from './StageDeposerOffreFormulaire.module.scss';

const EMAIL_REGEX = "^[a-zA-Z0-9!#$%&@'\u0022*+/=?^_`{|}~-]+(?:\\.[a-zA-Z0-9!#$%&'\u0022*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$";

enum Employeur {
	DESCRIPTION = 'descriptionEmployeur',
	EMAIL = 'emailEmployeur',
	LOGO = 'logoEmployeur',
	NOM = 'nomEmployeur',
	SITE = 'siteEmployeur'
}

export default function StageDeposerOffreFormulaireEntreprise() {
	const formRef = useRef<HTMLFormElement>(null);

	const [inputNom, setInputNom] = useState('');
	const [inputEmail, setInputEmail] = useState('');
	const [inputDescription, setInputDescription] = useState('');
	const [inputLogo, setInputLogo] = useState('');
	const [inputSite, setInputSite] = useState('');
	const router = useRouter();

	const localStorageEntreprise = useLocalStorage<OffreDeStageDéposée.Entreprise>(ETAPE_ENTREPRISE);
	const informationsEntreprise = localStorageEntreprise.get();

	useEffect(() => {
		if (informationsEntreprise !== null && formRef.current) {
			setInputNom(informationsEntreprise.nomEmployeur);
			setInputEmail(informationsEntreprise.emailEmployeur);
			setInputDescription(informationsEntreprise.descriptionEmployeur);
			setInputLogo(informationsEntreprise.logoEmployeur || '');
			setInputSite(informationsEntreprise.siteEmployeur || '');
		}
	}, [informationsEntreprise]);

	function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const form: HTMLFormElement = event.currentTarget;
		const data = new FormData(form);
		const donnéesEntreprise = parseDonnéesEntreprise(data);
		localStorageEntreprise.set(donnéesEntreprise);
		return router.push(`${URL_DEPOSER_OFFRE}/votre-offre-de-stage`);
	}
	
	return (
		<Container className={styles.container}>
			<div className={styles.etape}>Etape 1 sur 3 : Votre entreprise</div>
			<form className={styles.formulaire} ref={formRef} onSubmit={handleFormSubmit}>
				<p className={styles.champsObligatoires}>
					Les champs suivants sont obligatoires
				</p>
				<div className={styles.bodyFormulaire}>
					<InputText
						label="Indiquez le nom de l’entreprise ou de l’employeur"
						name={Employeur.NOM}
						value={inputNom}
						placeholder="Exemple : Crédit Agricole, SNCF…"
						required
					/>
					<InputText
						label="Indiquez une adresse mail de contact"
						pattern={EMAIL_REGEX}
						name={Employeur.EMAIL}
						value={inputEmail}
						placeholder="Exemple : contactRH@exemple.com"
						required
						tooltip={<Tooltip icon='information' ariaLabel='informations supplémentaires' ariaDescribedBy='informations-supplementaires'>Cette adresse de contact sera utilisée dans le cas où il manquerait des informations pour valider votre demande, ou pour vous informer du statut de cette dernière. Cette adresse peut donc être différente de l’adresse sur laquelle il faudra candidater.</Tooltip>}
					/>
					<InputArea
						className={styles.textareaWrapper}
						id="description"
						label="Rédigez une courte description de l’entreprise (500 caractères maximum)"
						placeholder="Indiquez des informations sur votre entreprise : son histoire, des objectifs, des enjeux..."
						name={Employeur.DESCRIPTION}
						defaultValue={inputDescription}
						required
						rows={10}
						maxLength={500}
					/>
				</div>
				<p className={styles.champsFacultatifs}>
					Les champs suivants sont facultatifs mais recommandés
				</p>
				<div className={styles.bodyFormulaire}>
					<InputText
						label="Partagez le logo de l’entreprise - lien/URL"
						type="url"
						name={Employeur.LOGO}
						value={inputLogo}
						placeholder="Exemple : https://www.1jeune1solution.gouv.fr/images/logos/r%C3..."
					/>
					<InputText
						label="Indiquez le lien du site de l’entreprise - lien/URL"
						type="url"
						name={Employeur.SITE}
						value={inputSite}
						placeholder="Exemple : https://1jeune1solution.gouv.fr"
					/>
				</div>
				<div className={styles.validation}>
					<ButtonComponent
						icon={<Icon name="angle-right"/>}
						iconPosition="right"
						label="Suivant"
						type="submit"
						className={styles.validationLink}
					/>
				</div>
			</form>
		</Container>
	);
};

function parseDonnéesEntreprise(formData: FormData):OffreDeStageDéposée.Entreprise {
	return {
		descriptionEmployeur: formData.get(Employeur.DESCRIPTION),
		emailEmployeur: formData.get(Employeur.EMAIL),
		logoEmployeur: formData.get(Employeur.LOGO),
		nomEmployeur: formData.get(Employeur.NOM),
		siteEmployeur: formData.get(Employeur.SITE),
	} as OffreDeStageDéposée.Entreprise;
}
