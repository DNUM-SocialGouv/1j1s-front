import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useState } from 'react';

import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import { ComboboxPays } from '~/client/components/ui/Form/Combobox/ComboboxPays';
import { InputText } from '~/client/components/ui/Form/InputText/InputText';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { paysEuropeList } from '~/client/domain/pays';
import { useEmploiEuropeQuery } from '~/client/hooks/useEmploiEuropeQuery';
import { getFormAsQuery } from '~/client/utils/form.util';

import styles
	from './FormulaireRechercheEmploisEurope.module.scss';

export function FormulaireRechercheEmploisEurope() {
	const queryParams = useEmploiEuropeQuery();
	const {
		motCle,
		libellePays,
		codePays,
	} = queryParams;
	const router = useRouter();

	const [inputMotCle, setInputMotCle] = useState(motCle ?? '');
	const localisationDefaultValue = (codePays && libellePays)
		? { code: codePays, label: libellePays }
		: undefined;

	function updateRechercherEmploiEuropeQueryParams(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const query = getFormAsQuery(event.currentTarget, queryParams);
		return router.push({ query }, undefined, { shallow: true });
	}

	return (
		<form
			className={styles.rechercheOffreForm}
			aria-label="Rechercher une offre d'emploi en Europe"
			onSubmit={updateRechercherEmploiEuropeQueryParams}
		>
			<div className={styles.filtresRechercherOffre}>
				<div className={styles.inputButtonWrapper}>
					<InputText
						label="Métier, mot-clé ou entreprise"
						value={inputMotCle}
						name="motCle"
						autoFocus
						placeholder="Exemples : boulanger, marketing, Google"
						onChange={(event: ChangeEvent<HTMLInputElement>) => setInputMotCle(event.currentTarget.value)}
					/>
					<ComboboxPays
						paysList={paysEuropeList}
						defaultValue={localisationDefaultValue}
						placeholder="Sélectionnez vos choix"
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
	);
}
