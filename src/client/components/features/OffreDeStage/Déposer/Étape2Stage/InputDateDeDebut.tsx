import { useMemo, useState } from 'react';

import {
	StageEnum,
} from '~/client/components/features/OffreDeStage/Déposer/Étape2Stage/StageDeposerOffreFormulaireÉtape2Stage';
import styles
	from '~/client/components/features/OffreDeStage/Déposer/Étape2Stage/StageDeposerOffreFormulaireÉtape2Stage.module.scss';
import { OffreDeStageDeposee } from '~/client/components/features/OffreDeStage/Déposer/StageDeposerOffre';
import { InputText } from '~/client/components/ui/Form/InputText/InputText';

const MAX_CMS_DATE = '9999-12-31';

export function InputDateDeDebut(props: { displayDateDeDebutPrecise: boolean, informationsStage: OffreDeStageDeposee.Stage | null }) {
	const disableBeforeToday: string = useMemo(() => {
		return new Date().toISOString().split('T')[0];
	}, []);

	const [dateDeDebutMin, setDateDeDebutMin] = useState<string | undefined>(props.informationsStage?.dateDeDebutMin ?? undefined);
	const [dateDeDebutMax, setDateDeDebutMax] = useState<string | undefined>(props.informationsStage?.dateDeDebutMax ?? undefined);

	function validationDateDeDebutMin(value: string | undefined) {
		if (value && !Date.parse(value)) return 'La date doit être au format YYYY-MM-DD';
		if (value && Date.parse(value) < Date.now()) return 'La date doit être supérieure ou égale à la date du jour';
		if (value && dateDeDebutMax && Date.parse(value) > Date.parse(MAX_CMS_DATE)) return 'La date doit être valide';
	}

	function validationDateDeDebutMax(value: string | undefined) {
		if (value && !Date.parse(value)) return 'La date doit être au format YYYY-MM-DD';
		if (value && dateDeDebutMin && Date.parse(value) < Date.parse(dateDeDebutMin)) return 'La date doit être supérieure ou égale à la date de début minimale';
		if (value && Date.parse(value) > Date.parse(MAX_CMS_DATE)) return 'La date doit être valide';
	}

	const patternDate = '^[0-9]{4}-[0-9]{2}-[0-9]{2}$';
	const currentDate = new Date();
	const placeholderDate = `Exemple : ${currentDate.toISOString().slice(0, 10)}`;

	return <>
		{props.displayDateDeDebutPrecise ?
			<InputText
				label="Date précise du début de stage"
				type="date"
				name={StageEnum.DATE_DE_DEBUT_MIN}
				value={dateDeDebutMin}
				required
				min={disableBeforeToday}
				max={'9999-12-31'}
				onChange={(event) => setDateDeDebutMin(event.target.value)}
				validation={(event) => validationDateDeDebutMin(event as string)}
				pattern={patternDate}
				placeholder={placeholderDate}
			/>
			:
			<div className={styles.contenuDateDeDebutInputDate}>
				<InputText
					label="Date de début du stage au plus tôt"
					type="date"
					name={StageEnum.DATE_DE_DEBUT_MIN}
					value={dateDeDebutMin}
					required
					min={disableBeforeToday}
					max={'9999-12-31'}
					onChange={(event) => setDateDeDebutMin(event.target.value)}
					validation={(event) => validationDateDeDebutMin(event as string)}
					pattern={patternDate}
					placeholder={placeholderDate}
				/>
				<InputText
					label="Date de début du stage au plus tard"
					type="date"
					name={StageEnum.DATE_DE_DEBUT_MAX}
					value={dateDeDebutMax}
					required
					min={dateDeDebutMin}
					max={'9999-12-31'}
					onChange={(event) => setDateDeDebutMax(event.target.value)}
					validation={(event) => validationDateDeDebutMax(event as string)}
					pattern={patternDate}
					placeholder={placeholderDate}
				/>
			</div>
		}
	</>;
}
