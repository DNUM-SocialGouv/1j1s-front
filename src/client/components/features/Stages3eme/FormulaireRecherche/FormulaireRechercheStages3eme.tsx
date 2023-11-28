import { useRouter } from 'next/router';
import { FormEvent, useRef } from 'react';

import styles
	from '~/client/components/features/OffreEmploi/FormulaireRecherche/FormulaireRechercheOffreEmploi.module.scss';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import { Icon } from '~/client/components/ui/Icon/Icon';

export function FormulaireRechercheStages3eme() {
	const rechercheStage3emeForm = useRef<HTMLFormElement>(null);

	const router = useRouter();

	function updateRechercherEmploiEuropeQueryParams(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		// NOTE (DORO 22-11-2023): Query params temporaire pour afficher les résultats de recherche (à remplacer par les vrais query params quand la recherche par localisation sera implémentée)
		return router.push({ query: 'location=here' }, undefined, { shallow: true });
	}

	return (
		<form
			ref={rechercheStage3emeForm}
			role="search"
			className={styles.rechercheOffreForm}
			aria-label="Rechercher un stage de 3ème"
			onSubmit={updateRechercherEmploiEuropeQueryParams}
		>
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
