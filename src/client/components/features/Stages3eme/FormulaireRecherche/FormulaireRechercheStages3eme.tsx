import { useRouter } from 'next/router';
import { FormEvent, useRef } from 'react';

import styles
	from '~/client/components/features/OffreEmploi/FormulaireRecherche/FormulaireRechercheOffreEmploi.module.scss';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import { ComboboxMetiersStage3eme } from '~/client/components/ui/Form/Combobox/ComboboxMetiersStage3eme';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { useStage3emeQuery } from '~/client/hooks/useStage3emeQuery';
import { getFormAsQuery } from '~/client/utils/form.util';

export function FormulaireRechercheStages3eme() {
	const queryParams = useStage3emeQuery();
	const {
		libelleMetier,
		codeMetier,
	} = queryParams;

	const metierDefaultValue = (codeMetier && libelleMetier)
		? { code: codeMetier, libelle: libelleMetier }
		: undefined;

	const rechercheStage3emeForm = useRef<HTMLFormElement>(null);

	const router = useRouter();

	function updateRechercherStage3emeQueryParams(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const query = getFormAsQuery(event.currentTarget, queryParams, false);
		// NOTE (DORO 22-11-2023): Query params "location=here" temporaire pour afficher les résultats de recherche (à remplacer par les vrais query params quand la recherche par localisation sera implémentée)
		return router.push({ query: `location=here${query ? '&' + query : ''}` }, undefined, { shallow: true });
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
					<ComboboxMetiersStage3eme
						defaultValue={metierDefaultValue}
						placeholder={'Exemples : boulanger, styliste...'}
						label={'Métier (facultatif)'}
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
