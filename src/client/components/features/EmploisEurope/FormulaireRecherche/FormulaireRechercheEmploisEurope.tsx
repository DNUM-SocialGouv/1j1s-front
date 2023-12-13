import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useCallback, useRef, useState } from 'react';

import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import { Checkbox } from '~/client/components/ui/Checkbox/Checkbox';
import { FilterAccordion } from '~/client/components/ui/FilterAccordion/FilterAccordion';
import { ComboboxPays } from '~/client/components/ui/Form/Combobox/ComboboxPays';
import { InputText } from '~/client/components/ui/Form/InputText/InputText';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { ModalComponent } from '~/client/components/ui/Modal/ModalComponent';
import { Select } from '~/client/components/ui/Select/Select';
import { niveauEtudeEures } from '~/client/domain/niveauEtudeEures';
import { paysEuropeList } from '~/client/domain/pays';
import useBreakpoint from '~/client/hooks/useBreakpoint';
import { useEmploiEuropeQuery } from '~/client/hooks/useEmploiEuropeQuery';
import { getFormAsQuery } from '~/client/utils/form.util';
import { typesContratEures } from '~/server/emplois-europe/infra/typesContratEures';

import styles
	from './FormulaireRechercheEmploisEurope.module.scss';

function addTypeDeContratToQueryParams(filterQuery: string, filterToToggle: string) {
	const currentString = filterQuery.split(',').filter((element) => element);
	const indexOfValue = currentString.indexOf(filterToToggle);
	if (indexOfValue >= 0) {
		currentString.splice(indexOfValue, 1);
	} else {
		currentString.push(filterToToggle);
	}

	return currentString.join(',');
}

function ModaleFiltreAvancee(props: {
	close: () => void,
	open: boolean,
	toggleTypeContrat: (typeContrat: string) => void,
	toggleNiveauEtude: (niveauEtude: string) => void,
	inputTypeContrat: string,
	inputNiveauEtude: string,
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
					{typesContratEures.map((typeContrat, index) => (
						<Checkbox
							key={`Type de contrat ${index}`}
							label={typeContrat.libellé}
							onChange={(e: ChangeEvent<HTMLInputElement>) => props.toggleTypeContrat(e.target.value)}
							value={typeContrat.valeur}
							// NOTE (DORO - 05-12-2023): Pourrait ne plus marcher si on ajoute des types de contrat (cas avec 2 chiffres)
							checked={props.inputTypeContrat.includes(typeContrat.valeur)}
						/>
					))}
				</FilterAccordion>
				<FilterAccordion title="Niveau d'études demandé">
					{niveauEtudeEures.map((niveauEtude, index) => (
						<Checkbox
							key={`Niveau d'études demandé ${index}`}
							label={niveauEtude.libellé}
							onChange={(e: ChangeEvent<HTMLInputElement>) => props.toggleNiveauEtude(e.target.value)}
							value={niveauEtude.valeur}
							checked={props.inputNiveauEtude.includes(niveauEtude.valeur)}
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
	} = queryParams;
	const router = useRouter();

	const { isSmallScreen } = useBreakpoint();
	const [isFiltresAvancesMobileOpen, setIsFiltresAvancesMobileOpen] = useState<boolean>(false);

	const [inputMotCle, setInputMotCle] = useState<string>(motCle ?? '');
	const [inputTypeContrat, setInputTypeContrat] = useState<string>(typeContrat ?? '');
	const [inputNiveauEtude, setInputNiveauEtude] = useState<string>(niveauEtude ?? '');
	const localisationDefaultValue = (codePays && libellePays)
		? { code: codePays, label: libellePays }
		: undefined;

	const toggleTypeContrat = useCallback((typeContrat: string) => {
		setInputTypeContrat(addTypeDeContratToQueryParams(inputTypeContrat, typeContrat));
	}, [inputTypeContrat]);
	
	const toggleNiveauEtude = useCallback((niveauEtude: string) => {
		setInputNiveauEtude(addTypeDeContratToQueryParams(inputNiveauEtude, niveauEtude));
	}, [inputNiveauEtude]);

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
						  <input type="hidden" name="niveauEtude" value={inputNiveauEtude}/>
						</div>
					}
					<ModaleFiltreAvancee
						close={() => setIsFiltresAvancesMobileOpen(false)}
						toggleTypeContrat={toggleTypeContrat}
						toggleNiveauEtude={toggleNiveauEtude}
						inputTypeContrat={inputTypeContrat}
						inputNiveauEtude={inputNiveauEtude}
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
							optionList={niveauEtudeEures}
							onChange={setInputNiveauEtude}
							label="Niveau d'études demandé"
							value={inputNiveauEtude}
							name="niveauEtude"
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
