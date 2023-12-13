import { useRouter } from 'next/router';
import React, { FormEvent } from 'react';

import styles
	from '~/client/components/features/Alternance/Rechercher/FormulaireRecherche/FormulaireRechercheAlternance.module.scss';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import { ComboboxCommune } from '~/client/components/ui/Form/Combobox/ComboboxCommune/ComboboxCommune';
import {
	ComboboxMetiers,
} from '~/client/components/ui/Form/Combobox/ComboboxMetiers';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { DependenciesProvider, useDependency } from '~/client/context/dependenciesContainer.context';
import { useAlternanceQuery } from '~/client/hooks/useAlternanceQuery';
import { mapToCommune } from '~/client/hooks/useCommuneQuery';
import { HttpClientService } from '~/client/services/httpClient.service';
import { BffMetierService } from '~/client/services/metiers/bff.metier.service';
import { getFormAsQuery } from '~/client/utils/form.util';

export function FormulaireRechercheAlternance() {
	const queryParams = useAlternanceQuery();
	const {
		libelleMetier,
		codeRomes,
		codeCommune,
		libelleCommune,
		distanceCommune,
		longitudeCommune,
		latitudeCommune,
		ville,
		codePostal,
	} = queryParams;

	const metierService = new BffMetierService(useDependency<HttpClientService>('httpClientService'));

	const domaineDefaultValue = (codeRomes && libelleMetier)
		? { code: codeRomes, label: libelleMetier }
		: undefined;

	const defaultCommune = mapToCommune({
		codeCommune,
		codePostal,
		latitudeCommune,
		libelleCommune,
		longitudeCommune,
		ville,
	});

	const router = useRouter();

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
						<DependenciesProvider metierService={metierService}>
							<ComboboxMetiers
								defaultValue={domaineDefaultValue}
								required
								autoFocus
								placeholder={'Exemples : enseignement, recherche...'}
								valueName={'codeRomes'}
							/>
						</DependenciesProvider>

						<ComboboxCommune
							defaultCommune={defaultCommune}
							showRadiusInput
							defaultDistance={distanceCommune}
							required
							placeholder={'Exemples : Toulouse, Paris...'}/>
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
