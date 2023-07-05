import { useRouter } from 'next/router';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import styles
	from '~/client/components/features/FormationInitiale/FormulaireRecherche/FormulaireRechercheFormationInitiale.module.scss';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import { InputText } from '~/client/components/ui/Form/InputText/InputText';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { useFormationInitialeQuery } from '~/client/hooks/useFormationInitialeQuery';
import { getFormAsQuery } from '~/client/utils/form.util';

export function FormulaireRechercheFormationInitiale() {
	const queryParams = useFormationInitialeQuery();
	const router = useRouter();
	const [inputMotCle, setInputMotCle] = useState<string>('');

	async function submitForm(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const query = getFormAsQuery(event.currentTarget, queryParams);
		return router.push({ query }, undefined, { shallow: true });
	}

	useEffect(function initFormValues() {
		setInputMotCle(queryParams.motCle || '');
	}, [queryParams]);


	return (
		<form
			className={styles.RechercheFormationInitialeForm}
			role="search"
			onSubmit={submitForm}
		>
			<InputText
				label="Domaine, mot-clé..."
				placeholder="Exemples: boulanger, informatique"
				value={inputMotCle}
				name="motCle"
				autoFocus
				onChange={(event: ChangeEvent<HTMLInputElement>) => setInputMotCle(event.currentTarget.value)}
			/>
			<div className={styles.buttonWrapper}>
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

