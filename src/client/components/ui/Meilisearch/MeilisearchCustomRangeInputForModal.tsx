import classNames from 'classnames';
import React, {
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';
import { useRange, UseRangeProps } from 'react-instantsearch';
import { v4 as uuidv4 } from 'uuid';

import styles from '~/client/components/ui/Meilisearch/MeilisearchCustomRangeInputForModal.module.scss';

interface MeilisearchCustomRangeInputForModalProps {
  unite: string
  min: number
  max: number
}

export function MeilisearchCustomRangeInputForModal(props: UseRangeProps & MeilisearchCustomRangeInputForModalProps) {
	const {
		refine,
		start,
	} = useRange(props);
	const { unite, min, max } = props;
  type EmptyInput = '';
  const [minValue, setMinValue] = useState<number | EmptyInput>('');
  const [maxValue, setMaxValue] = useState<number | EmptyInput>('');
  const inputMinRef = useRef(uuidv4());
  const inputMaxRef = useRef(uuidv4());

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
  	<fieldset className={styles.rangeBox}>
	  <label className={styles.label} htmlFor={inputMinRef.current}>Minimum</label>
	  <span className={styles.customRangeInputWrapper}>
  			<input
		  id={inputMinRef.current}
		  type="number"
		  min={min}
		  max={max}
		  value={minValue}
		  onChange={onMinInputChange}
		  onBlur={refineRange}
  			/>
  			<span>{unite}</span>
  		</span>
	  <label className={styles.label} htmlFor={inputMaxRef.current}>Maximum</label>
	  <span className={classNames(styles.customRangeInputWrapper)}>
  			<input
		  id={inputMaxRef.current}
		  type="number"
		  min={min}
		  max={max}
		  value={maxValue}
		  onChange={onMaxInputChange}
		  onBlur={refineRange}
  			/>
  			<span>{unite}</span>
  		</span>
  	</fieldset>
  );
}


