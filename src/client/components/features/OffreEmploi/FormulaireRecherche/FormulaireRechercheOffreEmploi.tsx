import { useRouter } from 'next/router';
import React, { ChangeEvent, FormEvent, useCallback, useEffect, useRef, useState } from 'react';

import styles
	from '~/client/components/features/OffreEmploi/FormulaireRecherche/FormulaireRechercheOffreEmploi.module.scss';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import { Checkbox } from '~/client/components/ui/Checkbox/Checkbox';
import { FilterAccordion } from '~/client/components/ui/FilterAccordion/FilterAccordion';
import {
	ComboboxLocalisation,
} from '~/client/components/ui/Form/Combobox/ComboboxLocalisation/ComboboxLocalisation';
import {
	mapToDefaultLocalisation,
} from '~/client/components/ui/Form/Combobox/ComboboxLocalisation/defaultLocalisation/mapToDefaultLocalisation';
import { InputText } from '~/client/components/ui/Form/InputText/InputText';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { ModalComponent } from '~/client/components/ui/Modal/ModalComponent';
import { Radio } from '~/client/components/ui/Radio/Radio';
import { Select } from '~/client/components/ui/Select/Select';
import { référentielDomaineList } from '~/client/domain/référentielDomaineList';
import useBreakpoint from '~/client/hooks/useBreakpoint';
import { useOffreQuery } from '~/client/hooks/useOffreQuery';
import { getFormAsQuery } from '~/client/utils/form.util';
import {
	mapRéférentielDomaineToOffreCheckboxFiltre,
	mapTypeDeContratToOffreEmploiCheckboxFiltre,
} from '~/client/utils/offreEmploi.mapper';
import { Offre } from '~/server/offres/domain/offre';

function updateFilterQuery(filterQuery: string, filterToToggle: string) {
	const currentString = filterQuery.split(',').filter((element) => element);
	const indexOfValue = currentString.indexOf(filterToToggle);
	if (indexOfValue >= 0) {
		currentString.splice(indexOfValue, 1);
	} else {
		currentString.push(filterToToggle);
	}

	return currentString.join(',');
}

export function FormulaireRechercheOffreEmploi() {
	const rechercheOffreEmploiForm = useRef<HTMLFormElement>(null);

	const [isFiltresAvancésMobileOpen, setIsFiltresAvancésMobileOpen] = useState(false);

	const queryParams = useOffreQuery();
	const { isSmallScreen } = useBreakpoint();
	const router = useRouter();

	const [inputTypeDeContrat, setInputTypeDeContrat] = useState(queryParams.typeDeContrats ?? '');
	const [inputExpérience, setInputExpérience] = useState(queryParams.experienceExigence ?? '');
	const [inputTempsDeTravail, setInputTempsDeTravail] = useState(queryParams.tempsDeTravail ?? '');
	const [inputDomaine, setInputDomaine] = useState(queryParams.grandDomaine ?? '');
	const [inputMotCle, setInputMotCle] = useState(queryParams.motCle ?? '');

	const inputLocalisation = mapToDefaultLocalisation(queryParams.codeLocalisation, queryParams.typeLocalisation, queryParams.nomLocalisation, queryParams.codePostalLocalisation);

	useEffect(function fermerFiltresAvancésSurÉcranLarge() {
		if (!isSmallScreen) {
			setIsFiltresAvancésMobileOpen(false);
		}
	}, [isSmallScreen]);

	const applyFiltresAvancés = useCallback(() => {
		setIsFiltresAvancésMobileOpen(false);
		rechercheOffreEmploiForm.current?.dispatchEvent(
			new Event('submit', { bubbles: true, cancelable: true }),
		);
	}, []);

	const toggleTypeDeContrat = useCallback((value: string) => {
		setInputTypeDeContrat(updateFilterQuery(inputTypeDeContrat, value));
	}, [inputTypeDeContrat]);

	const toggleDomaine = useCallback((value: string) => {
		setInputDomaine(updateFilterQuery(inputDomaine, value));
	}, [inputDomaine]);

	function updateRechercherOffreEmploiQueryParams(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const query = getFormAsQuery(event.currentTarget, queryParams);
		return router.push({ query }, undefined, { shallow: true });
	}

	return (
		<form
			ref={rechercheOffreEmploiForm}
			aria-label="Rechercher une offre d'emploi"
			className={styles.rechercheOffreForm}
			onSubmit={updateRechercherOffreEmploiQueryParams}
		>
			<div className={styles.filtresRechercherOffre}>
				<div className={styles.inputButtonWrapper}>
					<InputText
						label="Métier, mot-clé"
						value={inputMotCle}
						name="motCle"
						autoFocus
						placeholder="Exemples : boulanger, informatique..."
						onChange={(event: ChangeEvent<HTMLInputElement>) => setInputMotCle(event.currentTarget.value)}
					/>
					<ComboboxLocalisation
						defaultValue={inputLocalisation}
						placeholder="Exemples : Paris, Béziers..."
					/>

					{isSmallScreen &&
						<div>
							<ButtonComponent
								appearance="quaternary"
								icon={<Icon name="filter"/>}
								iconPosition="right"
								label="Filtrer ma recherche"
								onClick={() => setIsFiltresAvancésMobileOpen(!isFiltresAvancésMobileOpen)}
							/>
							<input type="hidden" name="typeDeContrats" value={inputTypeDeContrat}/>
							<input type="hidden" name="tempsDeTravail" value={inputTempsDeTravail}/>
							<input type="hidden" name="experienceExigence" value={inputExpérience}/>
							<input type="hidden" name="grandDomaine" value={inputDomaine}/>
						</div>
					}
					<ModalComponent
						close={() => setIsFiltresAvancésMobileOpen(!isFiltresAvancésMobileOpen)}
						closeTitle="Fermer les filtres"
						isOpen={isFiltresAvancésMobileOpen}
						aria-labelledby="dialog_label">
						<ModalComponent.Title>
							<Icon name="menu"/>
							<span id="dialog_label">Filtrer ma recherche</span>
						</ModalComponent.Title>
						<ModalComponent.Content className={styles.filtresAvancésModalContenu}>
							<FilterAccordion title="Type de contrat" open>
								{Offre.TYPE_DE_CONTRAT_LIST.map((typeDeContrat, index) => (
									<Checkbox
										key={`Type de contrat${index}`}
										label={typeDeContrat.libelléLong}
										onChange={(e: ChangeEvent<HTMLInputElement>) => toggleTypeDeContrat(e.target.value)}
										value={typeDeContrat.valeur}
										checked={inputTypeDeContrat.includes(typeDeContrat.valeur)}
									/>
								))}
							</FilterAccordion>
							<FilterAccordion title="Temps de travail">
								{Offre.TEMPS_DE_TRAVAIL_LIST.map((tempsDeTravail, index) => (
									<Radio
										key={index}
										label={tempsDeTravail.libellé}
										name="tempsDeTravail"
										checked={inputTempsDeTravail === tempsDeTravail.valeur}
										onChange={() => setInputTempsDeTravail(tempsDeTravail.valeur)}
										value={tempsDeTravail.valeur}
									/>
								))}
							</FilterAccordion>
							<FilterAccordion title="Niveau demandé">
								{Offre.EXPÉRIENCE.map((expérience, index) => (
									<Radio
										key={`Niveau demandé${index}`}
										label={expérience.libellé}
										name={expérience.libellé}
										checked={inputExpérience === expérience.valeur}
										onChange={() => setInputExpérience(expérience.valeur)}
										value={expérience.valeur}
									/>
								))}
							</FilterAccordion>
							<FilterAccordion title="Domaine">
								{référentielDomaineList.map((domaine, index) => (
									<Checkbox
										key={`Domaine${index}`}
										label={domaine.libelle}
										onChange={(e: ChangeEvent<HTMLInputElement>) => toggleDomaine(e.target.value)}
										value={domaine.code}
										checked={inputDomaine.split(',').includes(domaine.code)}
									/>
								))}
							</FilterAccordion>
						</ModalComponent.Content>
						<ModalComponent.Footer>
							<div className={styles.applyFiltersButton}>
								<ButtonComponent
									icon={<Icon name="angle-right"/>}
									iconPosition="right"
									label="Appliquer les filtres"
									onClick={applyFiltresAvancés}
								/>
							</div>
						</ModalComponent.Footer>
					</ModalComponent>
				</div>

				{!isSmallScreen && (
					<div className={styles.filtreRechercheDesktop}>
						<Select
							multiple
							optionList={mapTypeDeContratToOffreEmploiCheckboxFiltre(Offre.TYPE_DE_CONTRAT_LIST)}
							onChange={setInputTypeDeContrat}
							label="Types de contrats"
							value={inputTypeDeContrat}
							name="typeDeContrats"
						/>
						<Select
							name="tempsDeTravail"
							optionList={Offre.TEMPS_DE_TRAVAIL_LIST}
							onChange={setInputTempsDeTravail}
							value={inputTempsDeTravail}
							label="Temps de travail"
						/>
						<Select
							name="experienceExigence"
							optionList={Offre.EXPÉRIENCE}
							onChange={setInputExpérience}
							value={inputExpérience}
							label="Niveau demandé"
						/>
						<Select
							multiple
							optionList={mapRéférentielDomaineToOffreCheckboxFiltre(référentielDomaineList)}
							onChange={setInputDomaine}
							value={inputDomaine}
							name="grandDomaine"
							label="Domaines"
						/>
					</div>
				)}
			</div>
			<div className={styles.buttonRechercher}>
				<ButtonComponent
					icon={<Icon name="magnifying-glass"/>}
					iconPosition="right"
					label="Rechercher"
					type="submit"
				/>
			</div>
		</form>
	);
}
