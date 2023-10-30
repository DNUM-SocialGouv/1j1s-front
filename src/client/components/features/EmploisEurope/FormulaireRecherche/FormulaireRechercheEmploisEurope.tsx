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
import { paysEuropeList } from '~/client/domain/pays';
import { typesContratEures } from '~/client/domain/typesContratEures';
import useBreakpoint from '~/client/hooks/useBreakpoint';
import { useEmploiEuropeQuery } from '~/client/hooks/useEmploiEuropeQuery';
import { getFormAsQuery } from '~/client/utils/form.util';

import styles
	from './FormulaireRechercheEmploisEurope.module.scss';

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

export function FormulaireRechercheEmploisEurope() {
	const rechercheEmploiEuropeForm = useRef<HTMLFormElement>(null);
	
	const queryParams = useEmploiEuropeQuery();
	const {
		motCle,
		libellePays,
		codePays,
		typeContrat,
	} = queryParams;
	const router = useRouter();

	const { isSmallScreen } = useBreakpoint();
	const [isFiltresAvancesMobileOpen, setIsFiltresAvancesMobileOpen] = useState(false);

	const [inputMotCle, setInputMotCle] = useState(motCle ?? '');
	const [inputTypeContrat, setInputTypeContrat] = useState(typeContrat ?? '');
	const localisationDefaultValue = (codePays && libellePays)
		? { code: codePays, label: libellePays }
		: undefined;

	const toggleTypeContrat = useCallback((typeContrat: string) => {
		setInputTypeContrat(updateFilterQuery(inputTypeContrat, typeContrat));
	}, [inputTypeContrat]);

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
						</div>
					}
					<ModalComponent
						close={() => setIsFiltresAvancesMobileOpen(!isFiltresAvancesMobileOpen)}
						closeTitle="Fermer les filtres"
						isOpen={isFiltresAvancesMobileOpen}
						aria-labelledby="dialog_label">
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
										onChange={(e: ChangeEvent<HTMLInputElement>) => toggleTypeContrat(e.target.value)}
										value={typeContrat.valeur}
										checked={inputTypeContrat.includes(typeContrat.valeur)}
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
									onClick={applyFiltresAvances}
								/>
							</div>
						</ModalComponent.Footer>
					</ModalComponent>
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
