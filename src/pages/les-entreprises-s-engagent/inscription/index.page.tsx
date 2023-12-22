import Image from 'next/image';
import React, { FormEvent, useCallback, useMemo, useRef, useState } from 'react';

import { DéchargeRGPD } from '~/client/components/features/LesEntreprisesSEngagent/DéchargeRGPD/DéchargeRGPD';
import { ModalLEEErreur } from '~/client/components/features/LesEntreprisesSEngagent/ModalLEEErreur/ModalLEEErreur';
import { Head } from '~/client/components/head/Head';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import { ComboboxCommune } from '~/client/components/ui/Form/Combobox/ComboboxCommune/ComboboxCommune';
import InputAutocomplétionSecteurActivité, {
	SecteurActivité,
} from '~/client/components/ui/Form/InputAutocomplétion/InputAutocomplétionSecteurActivité';
import { InputText } from '~/client/components/ui/Form/InputText/InputText';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { LinkStyledAsButtonWithIcon } from '~/client/components/ui/LinkStyledAsButton/LinkStyledAsButton';
import { Select } from '~/client/components/ui/Select/Select';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import useAnalytics from '~/client/hooks/useAnalytics';
import {
	LesEntreprisesSEngagentService,
} from '~/client/services/lesEntreprisesSEngagent/lesEntreprisesSEngagent.service';
import analytics from '~/pages/les-entreprises-s-engagent/inscription/index.analytics';
import styles from '~/pages/les-entreprises-s-engagent/inscription/index.module.scss';
import { EntrepriseSouhaitantSEngager, SecteurDActivité, TailleDEntreprise } from '~/server/entreprises/domain/EntrepriseSouhaitantSEngager';
import { isSuccess } from '~/server/errors/either';
import { emailRegex } from '~/shared/emailRegex';

enum Etape {
	ETAPE_1 = 'Étape 1 sur 2',
	ETAPE_2 = 'Étape 2 sur 2'
}

export const TITLE_ÉTAPE_1 = 'Les entreprises s‘engagent - Rejoignez la mobilisation ! - Étape 1 sur 2 | 1jeune1solution';
export const TITLE_ÉTAPE_2 = 'Les entreprises s‘engagent - Rejoignez la mobilisation ! - Étape 2 sur 2 | 1jeune1solution';
export const TITLE_VALIDÉE = 'Les entreprises s‘engagent - Rejoignez la mobilisation ! - Formulaire envoyé | 1jeune1solution';

const taillesEntreprises = Object.entries(TailleDEntreprise).map(([valeur, libellé]) => ({ libellé, valeur }));

export default function LesEntreprisesSEngagentInscription() {
	useAnalytics(analytics);
	const lesEntreprisesSEngagentService = useDependency<LesEntreprisesSEngagentService>('lesEntreprisesSEngagentService');
	const [title, setTitle] = useState<string>(TITLE_ÉTAPE_1);
	const [étape, setÉtape] = useState<Etape>(Etape.ETAPE_1);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isFormSuccessfullySent, setIsFormSuccessfullySent] = useState<boolean>(false);
	const [secteurActiviteChoisie, setSecteurActiviteChoisie] = useState<SecteurActivité>();
	const [isErreurModalOpen, setIsErreurModalOpen] = useState(false);

	const formStep1Ref = useRef<HTMLFormElement>(null);
	const formStep2Ref = useRef<HTMLFormElement>(null);

	const isPremièreÉtape = useMemo(() => étape === Etape.ETAPE_1, [étape]);
	const isDeuxiemeEtape = useMemo(() => étape === Etape.ETAPE_2, [étape]);

	const goToStep2 = useCallback((event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (isPremièreÉtape && event.currentTarget.checkValidity()) {
			setTitle(TITLE_ÉTAPE_2);
			setÉtape(Etape.ETAPE_2);
		}
	}, [isPremièreÉtape]);

	const returnToStep1 = useCallback(() => {
		setTitle(TITLE_ÉTAPE_1);
		setÉtape(Etape.ETAPE_1);
	}, []);

	const buildEntrepriseSouhaitantSEngager = useCallback((): EntrepriseSouhaitantSEngager => {
		const formStep1Data = new FormData(formStep1Ref.current || undefined);
		const formStep2Data = new FormData(formStep2Ref.current || undefined);
		return {
			codePostal: String(formStep1Data.get('codePostal')),
			email: String(formStep2Data.get('email')),
			nom: String(formStep2Data.get('lastName')),
			nomSociété: String(formStep1Data.get('companyName')),
			prénom: String(formStep2Data.get('firstName')),
			secteur: secteurActiviteChoisie!.valeur as (keyof typeof SecteurDActivité), // FIXME (SULI 08-12-2023): à homogénéiser quand InputAutocomplétionSecteurActivité sera reworked
			siret: String(formStep1Data.get('companySiret')),
			taille: String(formStep1Data.get('companySize')) as (keyof typeof TailleDEntreprise),
			travail: String(formStep2Data.get('job')),
			téléphone: String(formStep2Data.get('phone')),
			ville: String(formStep1Data.get('ville')),
		};
	}, [secteurActiviteChoisie]);

	const submitFormulaire = useCallback(async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (event.currentTarget.checkValidity()) {
			setIsLoading(true);
			const response = await lesEntreprisesSEngagentService.envoyerFormulaireEngagement(buildEntrepriseSouhaitantSEngager());

			if (isSuccess(response)) {
				setTitle(TITLE_VALIDÉE);
				setIsFormSuccessfullySent(true);
			} else {
				setIsErreurModalOpen(true);
			}
			setIsLoading(false);
		}
	}, [lesEntreprisesSEngagentService, buildEntrepriseSouhaitantSEngager]);


	return (
		<main id="contenu">
			<Head
				title={title}
				description="Formulaire d’inscription pour rejoindre la mobilisation “Les Entreprises s’Engagent”"
				robots="index,follow"
			/>
			{
				!isFormSuccessfullySent &&
				<>
					<div className={styles.header}>
						<div className={styles.logo}>
							<Image src="/icons/les-entreprises-s-engagent.svg" alt="" width={144} height={80}/>
						</div>
						<h1 className={styles.titre}>JE REJOINS &ldquo;LES ENTREPRISES S‘ENGAGENT&rdquo;</h1>
					</div>
					<div className={styles.content}>
						<div className={styles.etape}>{étape}</div>
						<div className={styles.mandatoryFields}>Tous les champs du formulaire sont
							obligatoires
						</div>
						<div hidden={isPremièreÉtape ? undefined : true}>
							<LinkStyledAsButtonWithIcon
								href="/les-entreprises-s-engagent"
								appearance="asSecondaryButton"
								iconPosition={'left'}
								icon={<Icon name="angle-left"/>}
								className={styles.boutonRetour}>
									Retour
							</LinkStyledAsButtonWithIcon>
							<form className={styles.formulaire} ref={formStep1Ref} onSubmit={goToStep2}
									  aria-label={'Formulaire Les entreprise s’engagent - Étape 1'}>
								<div className={styles.bodyFormulaire}>
									<InputText
										label="Nom de l’entreprise"
										name="companyName"
										placeholder="Exemples : Crédit Agricole, SNCF…"
										required
									/>
									<ComboboxCommune
										required
										label="Ville du siège social de l’entreprise"
										name="companyCommuneLibelle"
									/>
									<InputText
										label="Numéro de SIRET"
										name="companySiret"
										placeholder="Exemple : 12345678901112"
										required
										pattern={'^[0-9]{14}$'}
									/>
									<InputAutocomplétionSecteurActivité
										required
										id="autocomplete-secteur-activité"
										label="Secteur d’activité de l’entreprise"
										name="companySector"
										placeholder="Exemples : Administration publique, Fonction publique d’Etat …"
										valeurInitiale={secteurActiviteChoisie}
										onSuggestionSelected={(event, suggestion) => {
											setSecteurActiviteChoisie(suggestion);
										}}
									/>
									<Select
										required
										label="Taille de l’entreprise"
										name="companySize"
										placeholder="Exemple : 250 à 499 salariés"
										optionList={taillesEntreprises}
									/>
								</div>

								<div className={styles.validationEtape1}>
									<ButtonComponent
										icon={<Icon name="angle-right"/>}
										iconPosition="right"
										label="Suivant"
										type="submit"
									/>
									<DéchargeRGPD/>
								</div>
							</form>
						</div>
						<div hidden={isDeuxiemeEtape ? undefined : true}>
							<ButtonComponent
								appearance="secondary"
								className={styles.boutonRetour}
								icon={<Icon name="angle-left"/>}
								iconPosition="left"
								onClick={returnToStep1}
								label="Retour"
							/>
							<form className={styles.formulaire} ref={formStep2Ref} onSubmit={submitFormulaire}>
								<div className={styles.bodyFormulaire}>
									<InputText
										label="Prénom"
										name="firstName"
										placeholder="Exemples : Marc, Sonia…"
										required
									/>
									<InputText
										label="Nom"
										name="lastName"
										placeholder="Exemples : Ducourt, Dupont…"
										required
									/>
									<InputText
										label="Fonction au sein de l’entreprise"
										name="job"
										placeholder="Exemples : RH, Chargé de communications"
										required
									/>
									<InputText
										label="Adresse e-mail de contact"
										pattern={emailRegex}
										name="email"
										placeholder="Exemple : mail@exemple.com"
										hint="Cette adresse vous permettra d’accéder à votre espace sécurisé afin de gérer les informations suivies."
										required
									/>
									<InputText
										label="Numéro de téléphone de contact"
										name="phone"
										placeholder="Exemple : 0199999999"
										pattern="^(\+33|0|0033)[1-9]\d{8}$"
										hint="Ce numéro nous permettra de communiquer avec vous afin de gérer les informations suivies."
										required
									/>
								</div>
								<div className={styles.validationEtape2}>
									<ButtonComponent
										icon={<Icon name="angle-right"/>}
										iconPosition="right"
										label="Envoyer le formulaire"
										type="submit"
										disabled={isLoading}
									/>
									<DéchargeRGPD/>
								</div>
							</form>
						</div>
						<p className={styles.footer}>
							Vous avez déposé une demande ? Vous avez une question ou souhaitez apporter une
							modification,{' '}
							<LinkStyledAsButtonWithIcon
								appearance={'asQuaternaryButton'}
								href="mailto:contact@lesentreprises-sengagent.org"
								prefetch={false}
								className={styles.contactLink}>
								nous contacter
							</LinkStyledAsButtonWithIcon>
						</p>
					</div>
				</>
			}
			{isFormSuccessfullySent &&
				<div className={styles.success}>
					<h1>Félicitations, votre formulaire a bien été envoyé !</h1>
				</div>}
			<ModalLEEErreur open={isErreurModalOpen} close={() => setIsErreurModalOpen(false)}/>
		</main>
	);
}
