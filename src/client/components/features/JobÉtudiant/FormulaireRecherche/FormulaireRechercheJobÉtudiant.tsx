import { useRouter } from 'next/router';
import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';

import styles
	from '~/client/components/features/OffreEmploi/FormulaireRecherche/FormulaireRechercheOffreEmploi.module.scss';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import { InputLocalisation } from '~/client/components/ui/Form/InputLocalisation/InputLocalisation';
import { InputText } from '~/client/components/ui/Form/InputText/InputText';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { Select } from '~/client/components/ui/Select/Select';
import { référentielDomaineList } from '~/client/domain/référentielDomaineList';
import { useOffreQuery } from '~/client/hooks/useOffreQuery';
import { getFormAsQuery } from '~/client/utils/form.util';
import {
	mapRéférentielDomaineToOffreCheckboxFiltre,
} from '~/client/utils/offreEmploi.mapper';


export function FormulaireRechercheJobÉtudiant() {
	const rechercheJobÉtudiantForm = useRef<HTMLFormElement>(null);

	const [inputDomaine, setInputDomaine] = useState('');
	const [inputMotCle, setInputMotCle] = useState<string>('');
	const [inputTypeLocalisation, setInputTypeLocalisation] = useState<string>('');
	const [inputLibelleLocalisation, setInputLibelleLocalisation] = useState<string>('');
	const [inputCodeLocalisation, setInputCodeLocalisation] = useState<string>('');

	const queryParams = useOffreQuery();
	const router = useRouter();

	useEffect(function initFormValues() {
		setInputMotCle(queryParams.motCle || '');
		setInputDomaine(queryParams.grandDomaine || '');
		setInputTypeLocalisation(queryParams.typeLocalisation || '');
		setInputCodeLocalisation(queryParams.codeLocalisation || '');
		setInputLibelleLocalisation(queryParams.libelleLocalisation || '');
	}, [queryParams]);

	async function updateRechercherJobÉtudiantQueryParams(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const query = getFormAsQuery(event.currentTarget, queryParams);
		return router.push({ query }, undefined, { shallow: true });
	}

	return (
		<form
			ref={rechercheJobÉtudiantForm}
			role="form"
			className={styles.rechercheOffreForm}
			onSubmit={updateRechercherJobÉtudiantQueryParams}
		>
			<div className={styles.filtresRechercherOffre}>
				<div className={styles.inputButtonWrapper}>
					<InputText
						label="Métier, mot-clé"
						value={inputMotCle}
						name="motCle"
						autoFocus
						placeholder="Exemple : serveur, tourisme..."
						onChange={(event: ChangeEvent<HTMLInputElement>) => setInputMotCle(event.currentTarget.value)}
					/>
					<InputLocalisation
						libellé={inputLibelleLocalisation}
						code={inputCodeLocalisation}
						type={inputTypeLocalisation}
					/>

					<Select
						multiple
						optionList={mapRéférentielDomaineToOffreCheckboxFiltre(référentielDomaineList)}
						onChange={setInputDomaine}
						label="Domaine"
						value={inputDomaine}
						name="grandDomaine"
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
