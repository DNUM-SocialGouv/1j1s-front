import { useRouter } from 'next/router';
import React, { FormEvent, useEffect, useState } from 'react';

import styles
	from '~/client/components/features/Engagement/Rechercher/FormulaireRecherche/FormulaireRechercheMissionEngagement.module.scss';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import { Checkbox } from '~/client/components/ui/Checkbox/Checkbox';
import { ComboboxCommune } from '~/client/components/ui/Form/Combobox/ComboboxCommune/ComboboxCommune';
import { Select } from '~/client/components/ui/Form/Select/Select';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { mapToCommune } from '~/client/hooks/useCommuneQuery';
import { useMissionEngagementQuery } from '~/client/hooks/useMissionEngagementQuery';
import { getFormAsQuery } from '~/client/utils/form.util';
import { MissionEngagement } from '~/server/engagement/domain/engagement';

interface FormulaireRechercheMissionEngagementProps {
	domainList: MissionEngagement.Domaine[]
}

export function FormulaireRechercheMissionEngagement({ domainList }: FormulaireRechercheMissionEngagementProps) {
	const router = useRouter();
	const queryParams = useMissionEngagementQuery();

	const {
		codeCommune,
		libelleCommune,
		latitudeCommune,
		longitudeCommune,
		ville,
		codePostal,
		distanceCommune,
		domain,
	} = queryParams;

	const defaultCommune = mapToCommune({
		codeCommune,
		codePostal,
		latitudeCommune,
		libelleCommune,
		longitudeCommune,
		ville,
	});

	const [ouvertAuxMineurs, setOuvertAuxMineurs] = useState<boolean>(false);


	useEffect(function initFormValues() {
		setOuvertAuxMineurs(queryParams.ouvertsAuxMineurs || false);
	}, [queryParams]);

	async function rechercherMission(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const query = getFormAsQuery(event.currentTarget, queryParams);
		return router.push({ query }, undefined, { shallow: true });
	}

	return (
		<form
			className={styles.rechercheMissionEngagementForm}
			onSubmit={rechercherMission}
			aria-label="Rechercher une mission d'engagement"
		>
			<div className={styles.rechercheMissionEngagementForm__Container}>
				<div className={styles.inputButtonWrapper}>
					<Select
						label="Domaine"
						name="domain"
						labelComplement="Exemple : Culture et loisirs"
						optionList={domainList}
						defaultValue={domain}
					/>
					<ComboboxCommune
						defaultCommune={defaultCommune}
						defaultDistance={distanceCommune}
						showRadiusInput
					/>
				</div>

				<Checkbox
					label="Dès 16 ans"
					id="ouvertAuxMineurs"
					checked={ouvertAuxMineurs}
					onChange={() => setOuvertAuxMineurs(!ouvertAuxMineurs)}
					name="ouvertsAuxMineurs"
					value="true"
				/>
			</div>

			<div className={styles.rechercherMissionEngagementButton}>
				<ButtonComponent label="Rechercher" icon={<Icon name="magnifying-glass"/>} iconPosition="right"
								 type="submit"/>
			</div>
		</form>
	);
}
