import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useCallback, useRef, useState } from 'react';

import { ModaleFiltreAvancee } from '~/client/components/features/EmploisEurope/FormulaireRecherche/ModaleFiltreAvancee';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import { Champ } from '~/client/components/ui/Form/Champ/Champ';
import { ComboboxPays } from '~/client/components/ui/Form/Combobox/ComboboxPays';
import { Input } from '~/client/components/ui/Form/Input';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { Select } from '~/client/components/ui/Select/Select';
import { tempsDeTravailEures } from '~/client/domain/codesTempsTravailEures';
import { niveauEtudesEures } from '~/client/domain/niveauEtudesEures';
import { paysEuropeList } from '~/client/domain/pays';
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
					<Champ>
						<Champ.Label>
							Métier, mot-clé ou entreprise
							<Champ.Label.Complement>Exemple : boulanger, marketing, Google</Champ.Label.Complement>
						</Champ.Label>
						<Champ.Input
							render={Input}
							autoFocus
							value={inputMotCle}
							name="motCle"
							onChange={(event: ChangeEvent<HTMLInputElement>) => setInputMotCle(event.currentTarget.value)}
						/>
						<Champ.Error/>
					</Champ>
					<ComboboxPays
						paysList={paysEuropeList}
						labelComplement="Exemple : Belgique, Allemagne"
						defaultValue={localisationDefaultValue}
						placeholder="Sélectionnez vos choix"
					/>

					<div className={styles.filtresRechercheMobile}>
						  <ButtonComponent
							appearance="quaternary"
							icon={<Icon name="filter"/>}
							iconPosition="right"
							label="Filtrer ma recherche"
							onClick={() => setIsFiltresAvancesMobileOpen(!isFiltresAvancesMobileOpen)}
						  />
					</div>
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

				<div className={styles.filtreRechercheDesktop}>
					<Select
						multiple
						optionList={typesContratEures}
						onChange={setInputTypeContrat}
						label="Type de contrat"
						value={inputTypeContrat}
						name="typeContrat"
						labelComplement="Exemple : Alternance, Contrat déterminé"
					/>
					<Select
						multiple
						optionList={tempsDeTravailEures}
						onChange={setInputTempsDeTravail}
						label="Temps de travail"
						value={inputTempsDeTravail}
						name="tempsDeTravail"
						labelComplement="Exemple : Temps plein, temps partiel"
					/>
					<Select
						multiple
						optionList={niveauEtudesEures}
						onChange={setInputNiveauEtude}
						label="Niveau d‘études demandé"
						value={inputNiveauEtude}
						name="niveauEtude"
						labelComplement="Exemple : Master, Bachelor"
					/>
					<Select
						multiple
						optionList={secteurActiviteEures}
						onChange={setInputSecteurActivite}
						label="Domaines"
						value={inputSecteurActivite}
						name="secteurActivite"
						labelComplement="Exemple : Agriculture, Communication"
					/>
				</div>
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
