import { useRouter } from 'next/router';
import React, { ChangeEvent, FormEvent, useRef, useState } from 'react';

import styles
	from '~/client/components/features/OffreEmploi/FormulaireRecherche/FormulaireRechercheOffreEmploi.module.scss';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import { Champ } from '~/client/components/ui/Form/Champ/Champ';
import {
	ComboboxLocalisation,
} from '~/client/components/ui/Form/Combobox/ComboboxLocalisation/ComboboxLocalisation';
import {
	mapToDefaultLocalisation,
} from '~/client/components/ui/Form/Combobox/ComboboxLocalisation/defaultLocalisation/mapToDefaultLocalisation';
import { Input } from '~/client/components/ui/Form/Input';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { Select } from '~/client/components/ui/Select/Select';
import { référentielDomaineList } from '~/client/domain/référentielDomaineList';
import { useOffreQuery } from '~/client/hooks/useOffreQuery';
import { getFormAsQuery } from '~/client/utils/form.util';
import {
	mapRéférentielDomaineToOffreCheckboxFiltre,
} from '~/client/utils/offreEmploi.mapper';


export function FormulaireRechercheJobÉtudiant() {
	const rechercheJobÉtudiantForm = useRef<HTMLFormElement>(null);

	const queryParams = useOffreQuery();
	const router = useRouter();

	const [inputDomaine, setInputDomaine] = useState(queryParams.grandDomaine ?? '');
	const [inputMotCle, setInputMotCle] = useState<string>(queryParams.motCle ?? '');

	const inputLocalisation = mapToDefaultLocalisation(queryParams.codeLocalisation, queryParams.typeLocalisation, queryParams.nomLocalisation, queryParams.codePostalLocalisation);

	async function updateRechercherJobÉtudiantQueryParams(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const query = getFormAsQuery(event.currentTarget, queryParams);
		return router.push({ query }, undefined, { scroll: false });
	}

	return (
		<form
			ref={rechercheJobÉtudiantForm}
			role="search"
			className={styles.rechercheOffreForm}
			onSubmit={updateRechercherJobÉtudiantQueryParams}
		>
			<div className={styles.filtresRechercherOffre}>
				<div className={styles.inputButtonWrapper}>
					<Champ>
						<Champ.Label>
							Métier, mot-clé (minimum 2 caractères)
							<Champ.Label.Complement>Exemples : boulanger, informatique…</Champ.Label.Complement>
						</Champ.Label>
						<Champ.Input
							render={Input}
							defaultValue={inputMotCle}
							name="motCle"
							onChange={(event: ChangeEvent<HTMLInputElement>) => setInputMotCle(event.currentTarget.value)}
							minLength={2}
						/>
						<Champ.Error/>
					</Champ>
					<ComboboxLocalisation
						defaultValue={inputLocalisation}
					/>

					<Select
						multiple
						optionList={mapRéférentielDomaineToOffreCheckboxFiltre(référentielDomaineList)}
						onChange={setInputDomaine}
						label="Domaines"
						labelComplement="Exemple : Commerce, Immobilier…"
						value={inputDomaine}
						name="grandDomaine"
					/>
				</div>
			</div>
			<div className={styles.buttonRechercher}>
				<ButtonComponent
					label='Rechercher'
					icon={<Icon name="magnifying-glass" />}
					iconPosition='right'
					type='submit'
				/>
			</div>
		</form>
	);
}
