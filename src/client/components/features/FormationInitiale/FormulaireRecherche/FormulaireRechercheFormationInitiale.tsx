import { useRouter } from 'next/router';
import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';

import styles
	from '~/client/components/features/FormationInitiale/FormulaireRecherche/FormulaireRechercheFormationInitiale.module.scss';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import { InputText } from '~/client/components/ui/Form/InputText/InputText';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { useFormationInitialeQuery } from '~/client/hooks/useFormationInitialeQuery';
import { getFormAsQuery } from '~/client/utils/form.util';

export function FormulaireRechercheFormationInitiale() {
	const refRechercheFormationInitiale = useRef<HTMLFormElement>(null);
	const queryParams = useFormationInitialeQuery();
	const router = useRouter();
	const [inputDomaine, setInputDomaine] = useState<string>('');

	async function updateQueryParams(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const query = getFormAsQuery(event.currentTarget, queryParams, false);
		return router.push({ query }, undefined, { shallow: true });
	}

	useEffect(function initFormValues() {
		setInputDomaine(queryParams.domaine || '');
	}, [queryParams]);


	return (
		<form
			ref={refRechercheFormationInitiale}
			className={styles.RechercheFormationInitialeForm}
			role="search"
			onSubmit={updateQueryParams}
		>
			<InputText
				label="Domaine, mot-clé..."
				placeholder="Exemples: boulanger, informatique"
				value={inputDomaine}
				name="domaine"
				autoFocus
				onChange={(event: ChangeEvent<HTMLInputElement>) => setInputDomaine(event.currentTarget.value)}
				required
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

