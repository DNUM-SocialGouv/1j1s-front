import { useRouter } from 'next/router';
import React, { FormEvent, useEffect, useState } from 'react';

import styles from '~/client/components/features/Engagement/FormulaireRecherche/FormulaireRechercheMissionEngagement.module.scss';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import { Checkbox } from '~/client/components/ui/Checkbox/Checkbox';
import { InputCommune } from '~/client/components/ui/Form/InputCommune/InputCommune';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { Select } from '~/client/components/ui/Select/Select';
import { useMissionEngagementQuery } from '~/client/hooks/useMissionEngagementQuery';
import { getFormAsQuery } from '~/client/utils/form.util';
import { MissionEngagement } from '~/server/engagement/domain/engagement';

interface FormulaireRechercheMissionEngagementProps {
  domainList: MissionEngagement.Domaine[]
}

export function FormulaireRechercheMissionEngagement({ domainList }: FormulaireRechercheMissionEngagementProps) {
	const router = useRouter();
	const queryParams = useMissionEngagementQuery();

	const [domainValue, setDomainValue] = useState('');
	const [inputLibelleCommune, setInputLibelleCommune] = useState<string>('');
	const [inputLatitudeCommune, setInputLatitudeCommune] = useState<string>('');
	const [inputLongitudeCommune, setInputLongitudeCommune] = useState<string>('');
	const [inputCodeCommune, setInputCodeCommune] = useState<string>('');
	const [inputDistanceCommune, setInputDistanceCommune] = useState<string>('');
	const [ouvertAuxMineurs, setOuvertAuxMineurs] = useState<boolean>(false);


	useEffect(function initFormValues() {
		setDomainValue(queryParams.domain || '');
		setInputLongitudeCommune(queryParams.longitudeCommune || '');
		setInputLatitudeCommune(queryParams.latitudeCommune || '');
		setInputCodeCommune(queryParams.codeCommune || '');
		setInputLibelleCommune(queryParams.libelleCommune || '');
		setInputDistanceCommune(queryParams.distanceCommune || '');
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
			role="form"
		>
			<div className={styles.rechercheMissionEngagementForm__Container}>
				<div className={styles.inputButtonWrapper}>
					<Select
						label="Domaine"
						name="domain"
						optionList={domainList}
						onChange={(value) => setDomainValue(value)}
						value={domainValue}
					/>
					<InputCommune
						code={inputCodeCommune}
						libellé={inputLibelleCommune}
						latitude={inputLatitudeCommune}
						longitude={inputLongitudeCommune}
						distance={inputDistanceCommune}
					/>
				</div>

				<div className={styles.accessibleAuxMineursWrapper}>
					<Checkbox
						label="Dès 16 ans"
						id="ouvertAuxMineurs"
						checked={ouvertAuxMineurs}
						onChange={() => setOuvertAuxMineurs(!ouvertAuxMineurs)}
					/>
					<input type="hidden" name="ouvertsAuxMineurs" value={String(ouvertAuxMineurs)}/>
				</div>
			</div>

			<div className={styles.rechercherMissionEngagementButton}>
				<ButtonComponent label='Rechercher' icon={<Icon name="magnifying-glass" />} iconPosition='right' type='submit' />
			</div>
		</form>
	);
}
