import { useRouter } from 'next/router';
import React, { FormEvent, useEffect, useState } from 'react';

import styles
	from '~/client/components/features/Formation/FormulaireRecherche/FormulaireRechercheFormation.module.scss';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import {
	InputAutocomplétionMétier,
} from '~/client/components/ui/Form/InputAutocomplétion/InputAutocomplétionMétier/InputAutocomplétionMétier';
import { InputCommune } from '~/client/components/ui/Form/InputCommune/InputCommune';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { useAlternanceQuery } from '~/client/hooks/useAlternanceQuery';
import { getFormAsQuery } from '~/client/utils/form.util';

export function FormulaireRechercherFormation() {
	const [inputLibelleMetier, setInputLibelleMetier] = useState<string>('');
	const [inputCodeRomes, setInputCodeRomes] = useState<string>('');
	const [inputCodeCommune, setInputCodeCommune] = useState<string>('');
	const [inputLibelléCommune, setInputLibelléCommune] = useState<string>('');
	const [inputDistanceCommune, setInputDistanceCommune] = useState<string>('');
	const [inputLongitudeCommune, setInputLongitudeCommune] = useState<string>('');
	const [inputLatitudeCommune, setInputLatitudeCommune] = useState<string>('');

	const router = useRouter();

	const queryParams = useAlternanceQuery();

	useEffect(function initFormValues() {
		setInputLibelleMetier(queryParams.libelleMetier || '');
		setInputCodeRomes(queryParams.codeRomes || '');
		setInputCodeCommune(queryParams.codeCommune || '');
		setInputLibelléCommune(queryParams.libelleCommune || '');
		setInputDistanceCommune(queryParams.distanceCommune || '');
		setInputLongitudeCommune(queryParams.longitudeCommune || '');
		setInputLatitudeCommune(queryParams.latitudeCommune || '');
	}, [queryParams]);

	async function updateRechercherFormationQueryParams(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const formEntries = getFormAsQuery(event.currentTarget, queryParams, false);
		return router.push({ query: new URLSearchParams(formEntries).toString() }, undefined, { shallow: true });
	}

	return (
		<>
			<p className={styles.champsObligatoires}>Tous les champs sont obligatoires</p>
			<form
				className={styles.rechercheFormationForm}
				role="form"
				onSubmit={updateRechercherFormationQueryParams}
			>
				<div className={styles.filtresRechercherFormation}>
					<div className={styles.inputButtonWrapper}>
						<InputAutocomplétionMétier
							name={'libelleMetier'}
							label={'Sélectionnez un domaine'}
							libellé={inputLibelleMetier}
							codeRomes={inputCodeRomes}
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
