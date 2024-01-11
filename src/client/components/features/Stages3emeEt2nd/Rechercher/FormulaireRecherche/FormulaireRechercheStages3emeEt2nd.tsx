import { useRouter } from 'next/router';
import React, { FormEvent, useRef } from 'react';

import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import { ComboboxCommune } from '~/client/components/ui/Form/Combobox/ComboboxCommune/ComboboxCommune';
import { ComboboxMetiers } from '~/client/components/ui/Form/Combobox/ComboboxMetiers';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import { MetierDependenciesProvider } from '~/client/context/metier.context';
import { mapToCommune } from '~/client/hooks/useCommuneQuery';
import { useStage3emeEt2ndQuery } from '~/client/hooks/useStage3emeEt2ndQuery';
import { MetierService } from '~/client/services/metiers/metier.service';
import { getFormAsQuery } from '~/client/utils/form.util';

import styles from './FormulaireRechercheStage3emeEt2nd.module.scss';

export function FormulaireRechercheStages3emeEt2nd() {
	const queryParams = useStage3emeEt2ndQuery();
	const {
		libelleMetier,
		codeMetier,
		codeCommune,
		codePostal,
		latitudeCommune,
		libelleCommune,
		longitudeCommune,
		ville,
	} = queryParams;

	const defaultCommuneValue = mapToCommune({ codeCommune, codePostal, latitudeCommune, libelleCommune, longitudeCommune, ville });

	const metierDefaultValue = (codeMetier && libelleMetier)
		? { code: codeMetier, label: libelleMetier }
		: undefined;

	const metierService = useDependency<MetierService>('metierStage3emeEt2ndService');

	const rechercheStage3emeForm = useRef<HTMLFormElement>(null);

	const router = useRouter();

	function updateRechercherStage3emeQueryParams(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const query = getFormAsQuery(event.currentTarget, queryParams, false);
		return router.push({ query }, undefined, { shallow: true });
	}

	return (<>
		<p className={styles.champsInformation}>Tous les champs sont obligatoires sauf mention contraire</p>
		<form
			ref={rechercheStage3emeForm}
			role="search"
			className={styles.rechercheOffreForm}
			aria-label="Rechercher un stage de 3ème et 2nd"
			onSubmit={updateRechercherStage3emeQueryParams}
		>
			<div className={styles.filtresRechercherOffre}>
				<div className={styles.inputButtonWrapper}>
					<MetierDependenciesProvider metierService={metierService}>
						<ComboboxMetiers
							defaultValue={metierDefaultValue}
							placeholder={'Exemples : boulanger, styliste...'}
							label={'Métier (facultatif)'}
							valueName={'codeMetier'}
						/>
					</MetierDependenciesProvider>
					<ComboboxCommune required showRadiusInput defaultCommune={defaultCommuneValue}/>
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
