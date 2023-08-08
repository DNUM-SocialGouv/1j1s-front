import { useRouter } from 'next/router';
import React, { FormEvent, useEffect, useState } from 'react';

import { useAlternanceQuery } from '../../../../../hooks/useAlternanceQuery';
import { getFormAsQuery } from '../../../../../utils/form.util';
import { ButtonComponent } from '../../../../ui/Button/ButtonComponent';
import {
	InputAutocomplétionMétier,
} from '../../../../ui/Form/InputAutocomplétion/InputAutocomplétionMétier/InputAutocomplétionMétier';
import { InputCommune } from '../../../../ui/Form/InputCommune/InputCommune';
import { Icon } from '../../../../ui/Icon/Icon';
import styles
	from './FormulaireRechercheAlternance.module.scss';

export function FormulaireRechercheAlternance() {
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

	async function updateRechercherAlternanceQueryParams(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const formEntries = getFormAsQuery(event.currentTarget, queryParams, false);
		return router.push({ query: new URLSearchParams(formEntries).toString() }, undefined, { shallow: true });
	}

	return (
		<>
			<p className={styles.champsObligatoires}>Tous les champs sont obligatoires</p>
			<form
				className={styles.rechercheOffreForm}
				aria-label="Rechercher une alternance"
				onSubmit={updateRechercherAlternanceQueryParams}
			>
				<div className={styles.filtresRechercherOffre}>
					<div className={styles.inputButtonWrapper}>
						<InputAutocomplétionMétier
							name={'libelleMetier'}
							label={'Domaine'}
							libellé={inputLibelleMetier}
							codeRomes={inputCodeRomes}
							required
							autoFocus
							placeholder={'Exemples : enseignement, recherche...'}
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
