import classNames from 'classnames';
import { useRouter } from 'next/router';
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useCallback, useRef, useState } from 'react';

import {
	ModaleFiltreAvancee,
} from '~/client/components/features/EmploisEurope/FormulaireRecherche/ModaleFiltreAvancee';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import { Champ } from '~/client/components/ui/Form/Champ/Champ';
import { ComboboxPays } from '~/client/components/ui/Form/Combobox/ComboboxPays';
import { Input } from '~/client/components/ui/Form/Input';
import { Select } from '~/client/components/ui/Form/Select/Select';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { tempsDeTravailEures } from '~/client/domain/codesTempsTravailEures';
import { niveauDEtudes } from '~/server/emplois-europe/domain/niveauDEtudes';
import { paysEuropeList } from '~/client/domain/pays';
import { useEmploiEuropeQuery } from '~/client/hooks/useEmploiEuropeQuery';
import { getFormAsQuery } from '~/client/utils/form.util';
import { secteurActiviteEures } from '~/server/emplois-europe/infra/secteurActiviteEures';
import { typesContratEures } from '~/server/emplois-europe/infra/typesContratEures';

import styles from './FormulaireRechercheEmploisEurope.module.scss';

function updateFilterQuery(filterQuery: Array<string>, filterToToggle: string) {
	const newQuery = filterQuery.filter((element) => element);
	const indexOfValue = newQuery.indexOf(filterToToggle);
	if (indexOfValue >= 0) {
		newQuery.splice(indexOfValue, 1);
	} else {
		newQuery.push(filterToToggle);
	}

	return newQuery;
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
	const [inputTypeContrat, setInputTypeContrat] = useState(typeContrat ? typeContrat.split(',') : []);
	const [inputTempsDeTravail, setInputTempsDeTravail] = useState(tempsDeTravail ? tempsDeTravail.split(',') : []);
	const [inputNiveauEtude, setInputNiveauEtude] = useState(niveauEtude ? niveauEtude.split(',') : []);
	const [inputSecteurActivite, setInputSecteurActivite] = useState(secteurActivite ? secteurActivite.split(',') : []);
	const localisationDefaultValue = (codePays && libellePays)
		? { code: codePays, label: libellePays }
		: undefined;

	const toggleTypeContrat = useCallback((typeContrat: string) => {
		setInputTypeContrat(updateFilterQuery(inputTypeContrat, typeContrat));
	}, [inputTypeContrat]);

	const toggleTempsDeTravail = useCallback((tempsDeTravail: string) => {
		setInputTempsDeTravail(updateFilterQuery(inputTempsDeTravail, tempsDeTravail));
	}, [inputTempsDeTravail]);

	const toggleNiveauEtude = useCallback((niveauEtude: string) => {
		setInputNiveauEtude(updateFilterQuery(inputNiveauEtude, niveauEtude));
	}, [inputNiveauEtude]);

	const toggleSecteurActivite = useCallback((secteurActivite: string) => {
		setInputSecteurActivite(updateFilterQuery(inputSecteurActivite, secteurActivite));
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

	function onChangeMultipleSelect(option: HTMLElement, setInputValue: Dispatch<SetStateAction<Array<string>>>) {
		const value = option.getAttribute('data-value') ?? '';
		setInputValue((previous) => {
			const indexOfValue = previous.indexOf(value);
			if (value && indexOfValue === -1) {
				previous.push(value);
			} else {
				previous.splice(indexOfValue, 1);
			}
			return previous;
		});
	}

	return (
		<form
			ref={rechercheEmploiEuropeForm}
			role="search"
			aria-label="Rechercher une offre d'emploi en Europe"
			onSubmit={updateRechercherEmploiEuropeQueryParams}
		>
			<div className={styles.filtresRechercherOffre}>
				<Champ className={styles.metier}>
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
					className={styles.localisation}
					paysList={paysEuropeList}
					labelComplement="Exemple : Belgique, Allemagne"
					defaultValue={localisationDefaultValue}
					placeholder="Sélectionnez vos choix"
				/>

				<ButtonComponent
					className={styles.buttonMoreFilterMobileOnly}
					appearance="quaternary"
					type="button"
					icon={<Icon name="filter"/>}
					iconPosition="right"
					label="Filtrer ma recherche"
					onClick={() => setIsFiltresAvancesMobileOpen(!isFiltresAvancesMobileOpen)}
				/>

				<Select
					className={classNames(styles.filtreDesktopOnly, styles.typeContrat)}
					multiple
					optionList={typesContratEures}
					onChange={(option) => onChangeMultipleSelect(option, setInputTypeContrat)}
					label="Type de contrat"
					value={inputTypeContrat}
					name="typeContrat"
					labelComplement="Exemple : Alternance, Contrat déterminé"
				/>
				<Select
					className={classNames(styles.filtreDesktopOnly, styles.tempsTravail)}
					multiple
					optionList={tempsDeTravailEures}
					onChange={(option) => onChangeMultipleSelect(option, setInputTempsDeTravail)}
					label="Temps de travail"
					value={inputTempsDeTravail}
					name="tempsDeTravail"
					labelComplement="Exemple : Temps plein, temps partiel"
				/>
				<Select
					className={classNames(styles.filtreDesktopOnly, styles.niveauEtudes)}
					multiple
					optionList={niveauDEtudes}
					onChange={(option) => onChangeMultipleSelect(option, setInputNiveauEtude)}
					label="Niveau d‘études demandé"
					value={inputNiveauEtude}
					name="niveauEtude"
					labelComplement="Exemple : Master, Bachelor"
				/>
				<Select
					className={classNames(styles.filtreDesktopOnly, styles.domaines)}
					multiple
					optionList={secteurActiviteEures}
					onChange={(option) => onChangeMultipleSelect(option, setInputSecteurActivite)}
					label="Domaines"
					value={inputSecteurActivite}
					name="secteurActivite"
					labelComplement="Exemple : Agriculture, Communication"
				/>
			</div>
			<div className={styles.buttonRechercher}>
				<ButtonComponent
					label="Rechercher"
					icon={<Icon name="magnifying-glass"/>}
					iconPosition="right"
					type="submit"
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
		</form>
	);
}
