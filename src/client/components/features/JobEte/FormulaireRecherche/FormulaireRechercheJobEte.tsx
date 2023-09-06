import { useRouter } from 'next/router';
import React, { ChangeEvent, FormEvent, useRef, useState } from 'react';

import styles
	from '~/client/components/features/OffreEmploi/FormulaireRecherche/FormulaireRechercheOffreEmploi.module.scss';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import {
	ComboboxLocalisation,
} from '~/client/components/ui/Form/Combobox/ComboboxLocalisation/ComboboxLocalisation';
import {
	createLocalisationDefaultValueFromQuery,
} from '~/client/components/ui/Form/Combobox/ComboboxLocalisation/CreateLocalisationDefaultValueFromQuery';
import { InputText } from '~/client/components/ui/Form/InputText/InputText';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { Select } from '~/client/components/ui/Select/Select';
import { référentielDomaineList } from '~/client/domain/référentielDomaineList';
import { useOffreQuery } from '~/client/hooks/useOffreQuery';
import { getFormAsQuery } from '~/client/utils/form.util';
import {
	mapRéférentielDomaineToOffreCheckboxFiltre,
} from '~/client/utils/offreEmploi.mapper';

export function FormulaireRechercheJobEte() {
	const rechercheJobEteForm = useRef<HTMLFormElement>(null);

	const queryParams = useOffreQuery();
	const router = useRouter();

	const [inputDomaine, setInputDomaine] = useState(queryParams.grandDomaine ?? '');
	const [inputMotCle, setInputMotCle] = useState<string>(queryParams.motCle ?? '');

	const inputLocalisation = createLocalisationDefaultValueFromQuery(queryParams.codeLocalisation, queryParams.typeLocalisation, queryParams.nomLocalisation, queryParams.codePostalLocalisation);

	async function updateRechercherJobEteQueryParams(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const query = getFormAsQuery(event.currentTarget, queryParams);
		return router.push({ query }, undefined, { shallow: true });
	}

	return (
		<form
			ref={rechercheJobEteForm}
			role="search"
			className={styles.rechercheOffreForm}
			onSubmit={updateRechercherJobEteQueryParams}
		>
			<div className={styles.filtresRechercherOffre}>
				<div className={styles.inputButtonWrapper}>
					<InputText
						label="Métier, mot-clé"
						value={inputMotCle}
						name="motCle"
						autoFocus
						placeholder="Exemples : serveur, tourisme..."
						onChange={(event: ChangeEvent<HTMLInputElement>) => setInputMotCle(event.currentTarget.value)}
					/>
					<ComboboxLocalisation
						defaultValue={inputLocalisation}
						placeholder="Exemples : Paris, Béziers..."
					/>

					<Select
						multiple
						optionList={mapRéférentielDomaineToOffreCheckboxFiltre(référentielDomaineList)}
						onChange={setInputDomaine}
						label="Domaines"
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
