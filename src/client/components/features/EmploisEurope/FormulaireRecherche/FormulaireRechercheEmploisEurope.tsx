import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useCallback, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import { Checkbox } from '~/client/components/ui/Checkbox/Checkbox';
import { FilterAccordion } from '~/client/components/ui/FilterAccordion/FilterAccordion';
import { ComboboxPays } from '~/client/components/ui/Form/Combobox/ComboboxPays';
import { InputText } from '~/client/components/ui/Form/InputText/InputText';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { ModalComponent } from '~/client/components/ui/Modal/ModalComponent';
import { Select } from '~/client/components/ui/Select/Select';
import { EURES_POSITION_SCHEDULE_TYPE, tempsDeTravailEures } from '~/client/domain/codesTempsTravailEures';
import { niveauEtudeEures } from '~/client/domain/niveauEtudeEures';
import { paysEuropeList } from '~/client/domain/pays';
import useBreakpoint from '~/client/hooks/useBreakpoint';
import { useEmploiEuropeQuery } from '~/client/hooks/useEmploiEuropeQuery';
import { getFormAsQuery } from '~/client/utils/form.util';
import { secteurActiviteEures } from '~/server/emplois-europe/infra/secteurActiviteEures';
import { typesContratEures } from '~/server/emplois-europe/infra/typesContratEures';

import styles from './FormulaireRechercheEmploisEurope.module.scss';

function addSelectionToQueryParams(filterQuery: string, filterToToggle: string) {
	const currentString = filterQuery.split(',').filter((element) => element);
	const indexOfValue = currentString.indexOf(filterToToggle);
	if (indexOfValue >= 0) {
		currentString.splice(indexOfValue, 1);
	} else {
		currentString.push(filterToToggle);
	}

	return currentString.join(',');
}

// TODO infra qui remonte trop loin? 
const valeursFiltresTempsDeTravail = tempsDeTravailEures.filter((tempsDeTravail) => tempsDeTravail.valeur !== EURES_POSITION_SCHEDULE_TYPE.Any);

function ModaleFiltreAvancee(props: {
	close: () => void,
	open: boolean,
	toggleTypeContrat: (typeContrat: string) => void,
	toggleTempsDeTravail: (tempsDeTravail: string) => void,
	toggleNiveauEtude: (niveauEtude: string) => void,
	toggleSecteurActivite: (secteurActivite: string) => void,
	inputTypeContrat: string,
	inputTempsDeTravail: string,
	inputNiveauEtude: string,
	inputSecteurActivite: string,
	onClick: () => void
}) {
	return (
		<ModalComponent
			close={props.close}
			closeTitle="Fermer les filtres"
			isOpen={props.open}
			aria-labelledby="dialog_label"
		>
			<ModalComponent.Title>
				<Icon name="menu"/>
				<span id="dialog_label">Filtrer ma recherche</span>
			</ModalComponent.Title>
			<ModalComponent.Content className={styles.filtresAvancesModalContenu}>
				<FilterAccordion title="Type de contrat" open>
					{typesContratEures.map((typeContrat) => (
						<Checkbox
							key={uuidv4()}
							label={typeContrat.libellé}
							onChange={(e: ChangeEvent<HTMLInputElement>) => props.toggleTypeContrat(e.target.value)}
							value={typeContrat.valeur}
							// NOTE (DORO - 05-12-2023): Pourrait ne plus marcher si on ajoute des types de contrat (cas avec 2 chiffres)
							checked={props.inputTypeContrat.includes(typeContrat.valeur)}
						/>
					))}
				</FilterAccordion>
				<FilterAccordion title="Temps de travail">
					{valeursFiltresTempsDeTravail.map((tempsDeTravail) => (
						<Checkbox
							key={uuidv4()}
							label={tempsDeTravail.libellé}
							onChange={(e: ChangeEvent<HTMLInputElement>) => props.toggleTempsDeTravail(e.target.value)}
							value={tempsDeTravail.valeur}
							checked={props.inputTempsDeTravail.includes(tempsDeTravail.valeur)}
						/>
					))}
				</FilterAccordion>
				<FilterAccordion title="Niveau d'études demandé">
					{niveauEtudeEures.map((niveauEtude) => (
						<Checkbox
							key={uuidv4()}
							label={niveauEtude.libellé}
							onChange={(e: ChangeEvent<HTMLInputElement>) => props.toggleNiveauEtude(e.target.value)}
							value={niveauEtude.valeur}
							checked={props.inputNiveauEtude.includes(niveauEtude.valeur)}
						/>
					))}
				</FilterAccordion>
				<FilterAccordion title="Domaines">
					{secteurActiviteEures.map((secteurActivite) => (
						<Checkbox
							key={uuidv4()}
							label={secteurActivite.libellé}
							onChange={(e: ChangeEvent<HTMLInputElement>) => props.toggleSecteurActivite(e.target.value)}
							value={secteurActivite.valeur}
							checked={props.inputSecteurActivite.includes(secteurActivite.valeur)}
						/>
					))}
				</FilterAccordion>
			</ModalComponent.Content>
			<ModalComponent.Footer>
				<div className={styles.buttonRechercher}>
					<ButtonComponent
						icon={<Icon name="angle-right"/>}
						iconPosition="right"
						label="Appliquer les filtres"
						onClick={props.onClick}
					/>
				</div>
			</ModalComponent.Footer>
		</ModalComponent>
	);
}

export function FormulaireRechercheEmploisEurope() {
	const rechercheEmploiEuropeForm = useRef<HTMLFormElement>(null);

	const queryParams = useEmploiEuropeQuery();
	const {
		motCle,
		libellePays,
		codePays,
		typeContrat,
		niveauEtude,
		secteurActivite,
		tempsDeTravail,
	} = queryParams;
	const router = useRouter();

	const { isSmallScreen } = useBreakpoint();
	const [isFiltresAvancesMobileOpen, setIsFiltresAvancesMobileOpen] = useState<boolean>(false);

	const [inputMotCle, setInputMotCle] = useState<string>(motCle ?? '');
	const [inputTypeContrat, setInputTypeContrat] = useState<string>(typeContrat ?? '');
	const [inputTempsDeTravail, setInputTempsDeTravail] = useState<string>(tempsDeTravail ?? '');
	const [inputNiveauEtude, setInputNiveauEtude] = useState<string>(niveauEtude ?? '');
	const [inputSecteurActivite, setInputSecteurActivite] = useState<string>(secteurActivite ?? '');
	const localisationDefaultValue = (codePays && libellePays)
		? { code: codePays, label: libellePays }
		: undefined;

	const toggleTypeContrat = useCallback((typeContrat: string) => {
		setInputTypeContrat(addSelectionToQueryParams(inputTypeContrat, typeContrat));
	}, [inputTypeContrat]);
	
	const toggleTempsDeTravail = useCallback((tempsDeTravail: string) => {
		setInputTempsDeTravail(addSelectionToQueryParams(inputTempsDeTravail, tempsDeTravail));
	}, [inputTempsDeTravail]);
	
	const toggleNiveauEtude = useCallback((niveauEtude: string) => {
		setInputNiveauEtude(addSelectionToQueryParams(inputNiveauEtude, niveauEtude));
	}, [inputNiveauEtude]);

	const toggleSecteurActivite = useCallback((secteurActivite: string) => {
		setInputSecteurActivite(addSelectionToQueryParams(inputSecteurActivite, secteurActivite));
	}, [inputSecteurActivite]);

	const applyFiltresAvances = useCallback(() => {
		setIsFiltresAvancesMobileOpen(false);
		rechercheEmploiEuropeForm.current?.dispatchEvent(
			new Event('submit', { bubbles: true, cancelable: true }),
		);
	}, []);

	function updateRechercherEmploiEuropeQueryParams(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const query = getFormAsQuery(event.currentTarget, queryParams);
		return router.push({ query }, undefined, { shallow: true });
	}

	return (
		<form
			ref={rechercheEmploiEuropeForm}
			role="search"
			className={styles.rechercheOffreForm}
			aria-label="Rechercher une offre d'emploi en Europe"
			onSubmit={updateRechercherEmploiEuropeQueryParams}
		>
			<div className={styles.filtresRechercherOffre}>
				<div className={styles.inputButtonWrapper}>
					<InputText
						label="Métier, mot-clé ou entreprise"
						value={inputMotCle}
						name="motCle"
						autoFocus
						placeholder="Exemples : boulanger, marketing, Google"
						onChange={(event: ChangeEvent<HTMLInputElement>) => setInputMotCle(event.currentTarget.value)}
					/>
					<ComboboxPays
						paysList={paysEuropeList}
						defaultValue={localisationDefaultValue}
						placeholder="Sélectionnez vos choix"
					/>
					{isSmallScreen &&
						<div>
						  <ButtonComponent
								appearance="quaternary"
								icon={<Icon name="filter"/>}
								iconPosition="right"
								label="Filtrer ma recherche"
								onClick={() => setIsFiltresAvancesMobileOpen(!isFiltresAvancesMobileOpen)}
						  />
							<input type="hidden" name="typeContrat" value={inputTypeContrat}/>
							<input type="hidden" name="tempsDeTravail" value={inputTempsDeTravail}/>
						  <input type="hidden" name="niveauEtude" value={inputNiveauEtude}/>
						  <input type="hidden" name="secteurActivite" value={inputSecteurActivite}/>
						</div>
					}
					<ModaleFiltreAvancee
						close={() => setIsFiltresAvancesMobileOpen(false)}
						toggleTypeContrat={toggleTypeContrat}
						toggleTempsDeTravail={toggleTempsDeTravail}
						toggleNiveauEtude={toggleNiveauEtude}
						toggleSecteurActivite={toggleSecteurActivite}
						inputTypeContrat={inputTypeContrat}
						inputSecteurActivite={inputSecteurActivite}
						inputNiveauEtude={inputNiveauEtude}
						inputTempsDeTravail={inputTempsDeTravail}
						open={isFiltresAvancesMobileOpen}
						onClick={applyFiltresAvances}
					/>
				</div>

				{!isSmallScreen && (
					<div className={styles.filtreRechercheDesktop}>
						<Select
							multiple
							optionList={typesContratEures}
							onChange={setInputTypeContrat}
							label="Type de contrat"
							value={inputTypeContrat}
							name="typeContrat"
						/>
						<Select
							multiple
							optionList={valeursFiltresTempsDeTravail}
							onChange={setInputTempsDeTravail}
							label="Temps de travail"
							value={inputTempsDeTravail}
							name="tempsDeTravail"
						/>

						<Select
							multiple
							optionList={niveauEtudeEures}
							onChange={setInputNiveauEtude}
							label="Niveau d'études demandé"
							value={inputNiveauEtude}
							name="niveauEtude"
						/>
						<Select
							multiple
							optionList={secteurActiviteEures}
							onChange={setInputSecteurActivite}
							label="Domaines"
							value={inputSecteurActivite}
							name="secteurActivite"
						/>
					</div>
				)}
			</div>
			<div className={styles.buttonRechercher}>
				<ButtonComponent
					label="Rechercher"
					icon={<Icon name="magnifying-glass"/>}
					iconPosition="right"
					type="submit"
				/>
			</div>
		</form>
	);
}
