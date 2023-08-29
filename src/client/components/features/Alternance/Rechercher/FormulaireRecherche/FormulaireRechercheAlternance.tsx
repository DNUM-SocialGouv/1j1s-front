import { useRouter } from 'next/router';
import React, { FormEvent } from 'react';

import styles
	from '~/client/components/features/Alternance/Rechercher/FormulaireRecherche/FormulaireRechercheAlternance.module.scss';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import {
	ComboboxMetiers,
} from '~/client/components/ui/Form/Combobox/ComboboxMetiers';
import { InputCommune } from '~/client/components/ui/Form/InputCommune/InputCommune';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { useAlternanceQuery } from '~/client/hooks/useAlternanceQuery';
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
	} = queryParams;

	const domaineDefaultValue = (codeRomes && libelleMetier)
		? { label: libelleMetier, romes: codeRomes }
		: undefined;

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
						<ComboboxMetiers
							label={'Domaine'}
							defaultValue={domaineDefaultValue}
							required
							autoFocus
							placeholder={'Exemples : enseignement, recherche...'}
						/>
						<InputCommune
							code={codeCommune ?? ''}
							libellé={libelleCommune ?? ''}
							longitude={longitudeCommune ?? ''}
							latitude={latitudeCommune ?? ''}
							distance={distanceCommune ?? ''}
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
