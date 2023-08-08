import { useRouter } from 'next/router';
import React, { FormEvent, useEffect, useState } from 'react';

import styles
	from '~/client/components/features/Formation/FormulaireRecherche/FormulaireRechercheFormation.module.scss';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import {
	ComboboxMetiers,
} from '~/client/components/ui/Form/Combobox/ComboboxMetiers/ComboboxMetiers';
import { InputCommune } from '~/client/components/ui/Form/InputCommune/InputCommune';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { Select } from '~/client/components/ui/Select/Select';
import { useFormationQuery } from '~/client/hooks/useFormationQuery';
import { getFormAsQuery } from '~/client/utils/form.util';
import { Formation } from '~/server/formations/domain/formation';

export function FormulaireRechercherFormation() {
	const queryParams = useFormationQuery();
	const {
		libelleMetier,
		codeRomes,
	} = queryParams;

	const [inputCodeCommune, setInputCodeCommune] = useState<string>('');
	const [inputLibelléCommune, setInputLibelléCommune] = useState<string>('');
	const [inputDistanceCommune, setInputDistanceCommune] = useState<string>('');
	const [inputLongitudeCommune, setInputLongitudeCommune] = useState<string>('');
	const [inputLatitudeCommune, setInputLatitudeCommune] = useState<string>('');
	const [inputNiveauEtudes, setInputNiveauEtudes] = useState<string>('');

	const router = useRouter();

	useEffect(function initFormValues() {
		// FIXME (GAFI 08-08-2023): Faire évoluer les composants pour pouvoir passer par defaultValue plutôt que value et onChange
		setInputCodeCommune(queryParams.codeCommune || '');
		setInputLibelléCommune(queryParams.libelleCommune || '');
		setInputDistanceCommune(queryParams.distanceCommune || '');
		setInputLongitudeCommune(queryParams.longitudeCommune || '');
		setInputLatitudeCommune(queryParams.latitudeCommune || '');
		setInputNiveauEtudes(queryParams.niveauEtudes || '');
	}, [queryParams]);

	async function updateRechercherFormationQueryParams(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const formEntries = getFormAsQuery(event.currentTarget, queryParams, false);
		return router.push({ query: new URLSearchParams(formEntries).toString() }, undefined, { shallow: true });
	}

	return (
		<>
			<p className={styles.champsObligatoires}>Tous les champs sont obligatoires sauf mention contraire</p>
			<form
				className={styles.rechercheFormationForm}
				aria-label="Rechercher une formation"
				onSubmit={updateRechercherFormationQueryParams}
			>
				<div className={styles.filtresRechercherFormation}>
					<div className={styles.inputButtonWrapper}>
						<ComboboxMetiers
							name={'libelleMetier'}
							label={'Domaine'}
							libellé={libelleMetier}
							codeRomes={codeRomes}
							required
							autoFocus
							placeholder="Exemples : ingénierie, agronomie..."
						/>
						<InputCommune
							code={inputCodeCommune}
							libellé={inputLibelléCommune}
							longitude={inputLongitudeCommune}
							latitude={inputLatitudeCommune}
							distance={inputDistanceCommune}
							required
							placeholder={'Exemples : Toulouse, Paris...'}
							showRadius
						/>
					</div>
					<Select
						name="niveauEtudes"
						optionList={Formation.NIVEAU_ETUDES}
						onChange={setInputNiveauEtudes}
						value={inputNiveauEtudes}
						label="Niveau d’études visé (facultatif)"
						className={styles.inputNiveauEtudes}
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
			</form>
		</>
	);
}
