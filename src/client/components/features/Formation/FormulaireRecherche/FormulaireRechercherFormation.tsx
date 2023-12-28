import { useRouter } from 'next/router';
import React, { FormEvent, useEffect, useState } from 'react';

import styles from '~/client/components/features/Formation/FormulaireRecherche/FormulaireRechercheFormation.module.scss';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import { ComboboxCommune } from '~/client/components/ui/Form/Combobox/ComboboxCommune/ComboboxCommune';
import { ComboboxMetiers } from '~/client/components/ui/Form/Combobox/ComboboxMetiers';
import { MetierOption } from '~/client/components/ui/Form/Combobox/ComboboxMetiers/MetierOption';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { Select } from '~/client/components/ui/Select/Select';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import { MetierDependenciesProvider } from '~/client/context/metier.context';
import { mapToCommune } from '~/client/hooks/useCommuneQuery';
import { useFormationQuery } from '~/client/hooks/useFormationQuery';
import { MetierService } from '~/client/services/metiers/metier.service';
import { getFormAsQuery } from '~/client/utils/form.util';
import { Formation } from '~/server/formations/domain/formation';

export function FormulaireRechercherFormation() {
	const queryParams = useFormationQuery();
	const {
		libelleMetier,
		codeRomes,
		codeCommune,
		libelleCommune,
		latitudeCommune,
		longitudeCommune,
		distanceCommune,
		ville,
		codePostal,
	} = queryParams;

	const domaineDefaultValue: MetierOption | undefined = (codeRomes && libelleMetier)
		? { code: codeRomes.toString(), label: libelleMetier }
		: undefined;

	const metierService = useDependency<MetierService>('metierLbaService');

	const communeDefaultValue = mapToCommune({
		codeCommune,
		codePostal,
		latitudeCommune,
		libelleCommune,
		longitudeCommune,
		ville,
	});

	const [inputNiveauEtudes, setInputNiveauEtudes] = useState<string>('');

	const router = useRouter();

	useEffect(function initFormValues() {
		// FIXME (GAFI 08-08-2023): Faire évoluer les composants pour pouvoir passer par defaultValue plutôt que value et onChange
		setInputNiveauEtudes(queryParams.niveauEtudes || '');
	}, [queryParams]);

	async function updateRechercherFormationQueryParams(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const formEntries = getFormAsQuery(event.currentTarget, queryParams, false);
		return router.push({ query: new URLSearchParams(formEntries).toString() }, undefined, { shallow: true });
	}

	return (
		<>
			<p className={styles.champsObligatoires}>Tous les champs sont obligatoires sauf mention contraire</p>
			<form
				className={styles.rechercheFormationForm}
				aria-label="Rechercher une formation"
				onSubmit={updateRechercherFormationQueryParams}
			>
				<div className={styles.filtresRechercherFormation}>
					<div className={styles.inputButtonWrapper}>
						<MetierDependenciesProvider metierService={metierService}>
							<ComboboxMetiers
								defaultValue={domaineDefaultValue}
								required
								autoFocus
								placeholder="Exemples : ingénierie, agronomie..."
								valueName={'codeRomes'}
							/>
						</MetierDependenciesProvider>
						<ComboboxCommune
							defaultCommune={communeDefaultValue}
							showRadiusInput
							defaultDistance={distanceCommune}
							required
							placeholder={'Exemples : Toulouse, Paris...'}/>
					</div>
					<Select
						name="niveauEtudes"
						optionList={Formation.NIVEAU_ETUDES}
						onChange={setInputNiveauEtudes}
						value={inputNiveauEtudes}
						label="Niveau d’études visé (facultatif)"
						className={styles.inputNiveauEtudes}
					/>
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
