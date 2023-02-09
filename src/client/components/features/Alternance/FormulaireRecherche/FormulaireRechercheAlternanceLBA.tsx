import React, { useEffect, useState } from 'react';

import styles
	from '~/client/components/features/OffreEmploi/FormulaireRecherche/FormulaireRechercheOffreEmploi.module.scss';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import {
	InputAutocomplétionMétier,
} from '~/client/components/ui/Form/InputAutocomplétion/InputAutocomplétionMétier/InputAutocomplétionMétier';
import { InputLocalisation } from '~/client/components/ui/Form/InputLocalisation/InputLocalisation';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { useOffreQuery } from '~/client/hooks/useOffreQuery';

export function FormulaireRechercheAlternanceLBA() {
	const [inputMotCle, setInputMotCle] = useState<string>('');

	const queryParams = useOffreQuery();

	useEffect(function initFormValues() {
		setInputMotCle(queryParams.motCle || '');
	}, [queryParams]);

	return (
		<form
			className={styles.rechercheOffreForm}
		>
			<div className={styles.filtresRechercherOffre}>
				<div className={styles.inputButtonWrapper}>
					<InputAutocomplétionMétier
						name={'métier'}
						label={'Métier, mot-clé...'}
						value={inputMotCle}
						required
						autoFocus
					/>
					<InputLocalisation
						libellé={'inputLibelleLocalisation'}
						code={'inputCodeLocalisation'}
						type={'inputTypeLocalisation'}
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
