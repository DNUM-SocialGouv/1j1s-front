import React, { ComponentPropsWithoutRef, useId } from 'react';

import { Champ } from '~/client/components/ui/Form/Champ/Champ';
import { Input } from '~/client/components/ui/Form/Input';
import { useSynchronizedRef } from '~/client/hooks/useSynchronizedRef';

import styles from './InputRemuneration.module.scss';
import { StageEnum } from './StageDeposerOffreFormulaireÉtape2Stage';

const UNITE = '€';


type ChampRemunerationProps = {
	defaultValue?: string
}

export function ChampRemuneration({ defaultValue }: ChampRemunerationProps) {
	const idUnite = useId();
	
	const InputRemuneration = React.forwardRef<HTMLInputElement, ComponentPropsWithoutRef<'input'>>(function InputRemuneration(
		props, outerRef) {
		const inputRef = useSynchronizedRef(outerRef);
		return <div className={styles.remunerationContenu}>
			<Input ref={inputRef} {...props}/>
			<span className={styles.remunerationContenuUnite} id={idUnite}>{UNITE}</span>
		</div>;
	});

	return (<Champ>
		<Champ.Label>
			Rémunération par mois
			<Champ.Label.Complement>Exemple : 560</Champ.Label.Complement>
		</Champ.Label>
		<Champ.Input
			render={InputRemuneration}
			type="number"
			name={StageEnum.REMUNERATION}
			min={0}
			aria-describedby={idUnite}
			defaultValue={defaultValue}
			className={styles.remunerationContenuInput}
		/>
		<Champ.Error/>
	</Champ>);
}
