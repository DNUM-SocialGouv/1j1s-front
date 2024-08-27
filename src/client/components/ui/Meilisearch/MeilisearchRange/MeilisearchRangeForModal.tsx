import React, { useCallback, useEffect, useState } from 'react';
import { useRange, UseRangeProps } from 'react-instantsearch';

import { Champ } from '../../Form/Champ/Champ';
import { InputWithUnit } from '../../Form/InputWithUnit/InputWithUnit';
import styles from './MeilisearchRangeForModal.module.scss';

interface MeilisearchRangeForModalProps extends Pick<React.ComponentPropsWithoutRef<'fieldset'>, 'aria-labelledby'> {
	unite: string
	nomDeLUnite: string
	min: number
	max: number
}

export function MeilisearchRangeForModal(props: UseRangeProps & MeilisearchRangeForModalProps) {
	const {
		refine,
		start,
	} = useRange(props);
	const { unite, nomDeLUnite, min, max } = props;
	type EmptyInput = '';
	const [minValue, setMinValue] = useState<number | EmptyInput>('');
	const [maxValue, setMaxValue] = useState<number | EmptyInput>('');

	const ariaLabelledBy = props['aria-labelledby'];

	useEffect(function updateMinValue() {
  	if (start[0] === -Infinity) setMinValue('');
	}, [start]);

	useEffect(function updateMaxValue() {
  	if (start[1] === Infinity) setMaxValue('');
	}, [start]);

	const onMaxInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
  	setMaxValue(value === '' ? value : Number(value));
	}, []);

	const onMinInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
  	setMinValue(value === '' ? value : Number(value));
	}, []);

	const refineRange = useCallback(() => {
  	const from = minValue || undefined;
  	const to = maxValue || undefined;
  	refine([from, to]);
	},[minValue, maxValue, refine]);

	return (
		<fieldset className={styles.rangeBox} aria-labelledby={ariaLabelledBy}>
			<Champ className={styles.champ}>
				<Champ.Label>Minimum</Champ.Label>
				<Champ.Input
					type="number"
					render={InputWithUnit}
					unite={unite}
					nomDeLUnite={nomDeLUnite}
					min={min}
					max={max}
					value={minValue}
					onChange={onMinInputChange}
					onBlur={refineRange}
				/>
				<Champ.Error />
			</Champ>
			<Champ className={styles.champ}>
				<Champ.Label>Maximum</Champ.Label>
				<Champ.Input
					render={InputWithUnit}
					unite={unite}
					nomDeLUnite={nomDeLUnite}
					type="number"
					min={min}
					max={max}
					value={maxValue}
					onChange={onMaxInputChange}
					onBlur={refineRange}
				/>
				<Champ.Error />
			</Champ>
		</fieldset>
	);
}


