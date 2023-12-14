import { useRouter } from 'next/router';
import React, { FormEvent, useRef } from 'react';

import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import { ComboboxMetiers } from '~/client/components/ui/Form/Combobox/ComboboxMetiers';
import { MetierCodeAppellation } from '~/client/components/ui/Form/Combobox/ComboboxMetiers/MetierCode';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { DependenciesProvider, useDependency } from '~/client/context/dependenciesContainer.context';
import { useStage3emeQuery } from '~/client/hooks/useStage3emeQuery';
import { HttpClientService } from '~/client/services/httpClient.service';
import { BffStage3emeMetierService } from '~/client/services/metiers/bff.stage.metier.service';
import { getFormAsQuery } from '~/client/utils/form.util';

import styles
	from './FormulaireRechercheStage3eme.module.scss';

export function FormulaireRechercheStages3eme() {
	const queryParams = useStage3emeQuery();
	const {
		libelleMetier,
		codeMetier,
	} = queryParams;

	const metierDefaultValue = (codeMetier && libelleMetier)
		? { code: [new MetierCodeAppellation(codeMetier)], label: libelleMetier }
		: undefined;
	
	const metierService = new BffStage3emeMetierService(useDependency<HttpClientService>('httpClientService'));

	const rechercheStage3emeForm = useRef<HTMLFormElement>(null);

	const router = useRouter();

	function updateRechercherStage3emeQueryParams(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const queryFromForm = getFormAsQuery(event.currentTarget, queryParams, false);
		// NOTE (DORO 22-11-2023): Query params "location=here" temporaire pour afficher les résultats de recherche (à remplacer par les vrais query params quand la recherche par localisation sera implémentée)
		const query = `location=here${queryFromForm ? '&' + queryFromForm : ''}`;
		return router.push({ query }, undefined, { shallow: true });
	}

	return (
		<form
			ref={rechercheStage3emeForm}
			role="search"
			className={styles.rechercheOffreForm}
			aria-label="Rechercher un stage de 3ème"
			onSubmit={updateRechercherStage3emeQueryParams}
		>
			<div className={styles.filtresRechercherOffre}>
				<div className={styles.inputButtonWrapper}>
					<DependenciesProvider metierService={metierService}>
						<ComboboxMetiers
							defaultValue={metierDefaultValue}
							placeholder={'Exemples : boulanger, styliste...'}
							label={'Métier (facultatif)'}
							valueName={'codeMetier'}
						/>
					</DependenciesProvider>
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
