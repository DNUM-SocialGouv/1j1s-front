import { useRouter } from 'next/router';
import React, { FormEvent, useEffect, useState } from 'react';

import styles
	from '~/client/components/features/Alternance/FormulaireRecherche/FormulaireRechercheAlternanceLBA.module.scss';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import {
	InputAutocomplétionMétier,
} from '~/client/components/ui/Form/InputAutocomplétion/InputAutocomplétionMétier/InputAutocomplétionMétier';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { useAlternanceQuery } from '~/client/hooks/useAlternanceQuery';

export function FormulaireRechercheAlternanceLBA() {
	const [inputLibelle, setInputLibelle] = useState<string>('');
	const [inputCodeRomes, setInputCodeRomes] = useState<string>('');
	const router = useRouter();

	const queryParams = useAlternanceQuery();

	useEffect(function initFormValues() {
		setInputLibelle(queryParams.libelle || '');
		setInputCodeRomes(queryParams.codeRomes || '');
	}, [queryParams]);

	async function updateRechercherAlternanceQueryParams(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const formEntries = Array.from(
			formData,
			([key, value]) => (
				[key, typeof value === 'string' ? value : value.name]
			),
		).filter((element) => element[0] in queryParams && element[1] !== '' && element[1] !== 'false');
		return router.push({ query: new URLSearchParams(formEntries).toString() }, undefined, { shallow: true });
	}

	return (
		<>
			<p className={styles.champsObligatoires}>Tous les champs sont obligatoires</p>
			<form
				className={styles.rechercheOffreForm}
				onSubmit={updateRechercherAlternanceQueryParams}
			>
				<div className={styles.filtresRechercherOffre}>
					<div className={styles.inputButtonWrapper}>
						<InputAutocomplétionMétier
							name={'libelle'}
							label={'Sélectionnez un métier, domaine'}
							libellé={inputLibelle}
							codeRomes={inputCodeRomes}
							required
							autoFocus
							placeholder={'Exemples : informatique, boulanger...'}
						/>
						{/*<InputLocalisation*/}
						{/*	libellé={'inputLibelleLocalisation'}*/}
						{/*	code={'inputCodeLocalisation'}*/}
						{/*	type={'inputTypeLocalisation'}*/}
						{/*/>*/}
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
		</>
	);
}
