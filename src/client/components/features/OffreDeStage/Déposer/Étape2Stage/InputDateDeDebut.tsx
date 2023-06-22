import { useMemo, useState } from 'react';

import {
	StageEnum,
} from '~/client/components/features/OffreDeStage/Déposer/Étape2Stage/StageDeposerOffreFormulaireÉtape2Stage';
import styles
	from '~/client/components/features/OffreDeStage/Déposer/Étape2Stage/StageDeposerOffreFormulaireÉtape2Stage.module.scss';
import { OffreDeStageDeposee } from '~/client/components/features/OffreDeStage/Déposer/StageDeposerOffre';
import { InputText } from '~/client/components/ui/Form/InputText/InputText';

export function InputDateDeDebut(props: { displayDateDeDebutPrecise: boolean, informationsStage: OffreDeStageDeposee.Stage | null }) {
	const disableBeforeToday: string = useMemo(() => {
		return new Date().toISOString().split('T')[0];
	}, []);

	const [dateDeDebutMin, setDateDeDebutMin] = useState<string | undefined>(props.informationsStage?.dateDeDebutMin ?? undefined);
	const [dateDeDebutMax, setDateDeDebutMax] = useState<string | undefined>(props.informationsStage?.dateDeDebutMax ?? undefined);

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
				/>
			</div>
		}
	</>;
}
