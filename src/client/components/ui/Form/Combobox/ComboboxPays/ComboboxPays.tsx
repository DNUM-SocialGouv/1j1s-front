import React, { useId, useState } from 'react';

import { Pays } from '~/client/domain/pays';

import { Combobox } from '..';
import styles from './ComboboxPays.module.scss';

type ComboboxProps = React.ComponentPropsWithoutRef<typeof Combobox>;
export type PaysOption = {
	label: string,
	code: string,
};
type ComboboxPaysProps = Omit<ComboboxProps, 'aria-label' | 'aria-labelledby' | 'defaultValue'> & {
	paysList: Pays[],
  label?: string,
	defaultValue?: PaysOption,
  debounceTimeout?: number,
	'aria-label'?: React.HTMLProps<'input'>['aria-label'],
	'aria-labelledby'?: React.HTMLProps<'input'>['aria-labelledby'],
}

const MESSAGE_ERREUR_FETCH = 'Une erreur est survenue lors de la récupération des pays. Veuillez réessayer plus tard.';
const MESSAGE_PAS_DE_RESULTAT
  = 'Aucune proposition ne correspond à votre saisie. Vérifiez que votre saisie correspond bien à un pays. Exemple : Belgique, …';
const MESSAGE_CHAMP_VIDE = 'Commencez à taper pour rechercher un pays';
const DEFAULT_LABEL = 'Localisation (pays)';

function PaysTrouves({ quantity }: { quantity: number }) {
	return (
		<span className={styles.nombreResultats}>{
			quantity > 1
				? `${quantity} pays trouvés`
				: `${quantity} pays trouvé`
		}</span>
	);
}

type FetchStatus = 'init' | 'success' | 'failure';
type ComboboxRef = React.ComponentRef<typeof Combobox>;
export const ComboboxPays = React.forwardRef<ComboboxRef, ComboboxPaysProps>(function ComboboxPays(props, ref) {
	const {
		paysList,
		label = DEFAULT_LABEL,
		defaultValue,
		onChange: onChangeProps = () => null,
		id: idProps,
		onInvalid: onInvalidProps = () => {},
		'aria-describedby': ariaDescribedby = '',
		...comboboxProps
	} = props;

	const [fieldError, setFieldError] = useState<string | null>(null);
	const [pays, setPays] =
		useState<PaysOption[]>(defaultValue ? [ defaultValue ] : []);
	const [status, setStatus] = useState<FetchStatus>('init');
	const [ value, setValue ] = useState(defaultValue?.label ?? '');

	const idState = useId();
	const inputId = idProps ?? idState;
	const errorId = useId();

	function getPays(motCle: string | undefined) {
		if (!motCle) {
			setPays([]);
			return;
		}
		const response = paysList.filter((pays) => pays.libellé.toLowerCase().includes(motCle.toLowerCase()));

		if (response) {
			const pays: PaysOption[] = response.map((pays) => ({
				code: pays.code,
				label: pays.libellé,
			}));
			setStatus('success');
			setPays(pays);
		} else {
			setStatus('failure');
		}
	}

	const isEmpty = value === '';

	return (
		<div>
			<label className={styles.label} htmlFor={inputId}>
				{label}
			</label>
			<Combobox
				ref={ref}
				autoComplete="off"
				id={inputId}
				valueName={'codePays'}
				name={'libellePays'}
				aria-label={label}
				onChange={(event, newValue) => {
					setFieldError(null);
					getPays(newValue);
					setValue(newValue);
					onChangeProps(event, newValue);
				}}
				onInvalid={(event) => {
					setFieldError(event.currentTarget.validationMessage);
					onInvalidProps(event);
				}}
				value={value}
				requireValidOption
				filter={Combobox.noFilter}
				aria-describedby={`${ariaDescribedby} ${errorId}`}
				{...comboboxProps}
			>
				{
					(pays.map((suggestion) => (
						<Combobox.Option key={suggestion.label} value={suggestion.code}>{suggestion.label}</Combobox.Option>
					)))
				}
				<li role='status'>
					{
						isEmpty && MESSAGE_CHAMP_VIDE
						|| status === 'failure' && MESSAGE_ERREUR_FETCH
						|| pays.length === 0 && MESSAGE_PAS_DE_RESULTAT
						|| <PaysTrouves quantity={pays.length} />
					}
				</li>
			</Combobox>
			<p id={errorId} className={styles.instructionMessageError}>{fieldError}</p>
		</div>
	);
});
