import { useRouter } from 'next/router';
import React, { FormEvent, useEffect, useState } from 'react';

import styles
	from '~/client/components/features/Alternance/FormulaireRecherche/FormulaireRechercheAlternance.module.scss';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import {
	InputAutocomplétionMétier,
} from '~/client/components/ui/Form/InputAutocomplétion/InputAutocomplétionMétier/InputAutocomplétionMétier';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { useAlternanceQuery } from '~/client/hooks/useAlternanceQuery';
import { getFormAsQuery } from '~/client/utils/form.util';

export function FormulaireRechercheAlternance() {
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
		const formEntries = getFormAsQuery(event.currentTarget, queryParams, false);
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
