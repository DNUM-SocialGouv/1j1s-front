import { useRouter } from 'next/router';
import React, { FormEvent } from 'react';

import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import { Champ } from '~/client/components/ui/Form/Champ/Champ';
import { ComboboxCommune } from '~/client/components/ui/Form/Combobox/ComboboxCommune/ComboboxCommune';
import { ComboboxMetiers } from '~/client/components/ui/Form/Combobox/ComboboxMetiers';
import { Metier } from '~/client/components/ui/Form/Combobox/ComboboxMetiers/Metier';
import { SelectSimple } from '~/client/components/ui/Form/Select/SelectSimple';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import { MetierDependenciesProvider } from '~/client/context/metier.context';
import { mapToCommune } from '~/client/hooks/useCommuneQuery';
import { useFormationQuery } from '~/client/hooks/useFormationQuery';
import { MetierService } from '~/client/services/metiers/metier.service';
import { getFormAsQuery } from '~/client/utils/form.util';
import { Formation } from '~/server/formations/domain/formation';

import styles
	from './FormulaireRechercheFormationAlternance.module.scss';

export function FormulaireRechercherFormationAlternance() {
	const queryParams = useFormationQuery();
	const {
		libelleMetier,
		codeRomes,
		codeCommune,
		latitudeCommune,
		longitudeCommune,
		distanceCommune,
		ville,
		codePostal,
		niveauEtudes,
	} = queryParams;

	const domaineDefaultValue: Metier | undefined = (codeRomes && libelleMetier)
		? { code: codeRomes.toString(), label: libelleMetier }
		: undefined;

	const metierService = useDependency<MetierService>('metierLbaService');

	const communeDefaultValue = mapToCommune({
		codeCommune,
		codePostal,
		latitudeCommune,
		longitudeCommune,
		ville,
	});
	const router = useRouter();

	async function updateRechercherFormationQueryParams(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const formEntries = getFormAsQuery(event.currentTarget, queryParams, false);
		return router.push({ query: new URLSearchParams(formEntries).toString() });
	}

	return (
		<>
			<p className={styles.champsObligatoires}>Tous les champs sont obligatoires sauf mention contraire</p>
			<form
				className={styles.rechercheFormationForm}
				aria-label="Rechercher une formation"
				onSubmit={updateRechercherFormationQueryParams}>
				<div className={styles.filtresRechercherFormation}>
					<MetierDependenciesProvider metierService={metierService}>
						<ComboboxMetiers
							defaultValue={domaineDefaultValue}
							required
							autoFocus
							valueName={'codeRomes'} />
					</MetierDependenciesProvider>
					<ComboboxCommune
						defaultCommune={communeDefaultValue}
						showRadiusInput
						defaultDistance={distanceCommune}
						required />

					<Champ>
						<Champ.Label>
							Niveau d’études visé (facultatif)
							<Champ.Label.Complement>Exemples : CAP, Bac...</Champ.Label.Complement>
						</Champ.Label>
						<Champ.Input
							render={SelectSimple}
							optionsAriaLabel={'Niveau d‘études'}
							name="niveauEtudes"
							defaultValue={niveauEtudes}>
							{Formation.NIVEAU_ETUDES.map((option) =>
								<SelectSimple.Option key={option.libellé} value={option.valeur}>{option.libellé}</SelectSimple.Option>,
							)}
						</Champ.Input>
						<Champ.Error />
					</Champ>
				</div>
				<div className={styles.buttonRechercher}>
					<ButtonComponent
						label="Rechercher"
						icon={<Icon name="magnifying-glass" />}
						iconPosition="right"
						type="submit" />
				</div>
			</form>
		</>
	);
}
