import classNames from 'classnames';
import React, { useId } from 'react';

import { Champ } from '~/client/components/ui/Form/Champ/Champ';
import { SelectMultiple, SelectMultipleProps } from '~/client/components/ui/Form/Select/SelectMultiple';
import { SelectOption } from '~/client/components/ui/Form/Select/SelectOption';
import { SelectSimple, SelectSimpleProps } from '~/client/components/ui/Form/Select/SelectSimple';

import styles from './Select.module.scss';


export interface OptionSelect {
	libellé: string;
	valeur: string;
}

type SelectProps = {
	label: string;
	labelComplement?: string
	optionList: OptionSelect[]
} & (
	SelectSimpleProps & { multiple?: false }
	| SelectMultipleProps & { multiple: true }
	)

export function Select(props: SelectProps) {
	const {
		className,
		label,
		labelComplement,
		multiple,
		optionList,
		...rest
	} = props;
	const labelledBy = useId();

	function isSelectMultipleProps(rest: SelectSimpleProps | SelectMultipleProps): rest is SelectMultipleProps {
		return multiple === true;
	}

	function isSelectSimpleProps(rest: SelectSimpleProps | SelectMultipleProps): rest is SelectSimpleProps {
		return !multiple;
	}

	return (
		<div className={classNames(styles.selectWrapper, className)}>
			<Champ>
				<Champ.Label id={labelledBy}>
					{label}
					{labelComplement && <Champ.Label.Complement>{labelComplement}</Champ.Label.Complement>}
				</Champ.Label>
				{isSelectSimpleProps(rest) && <Champ.Input render={SelectSimple} labelledBy={labelledBy} {...rest}>
					{optionList.map((option) =>
						<SelectSimple.Option key={option.libellé} option={option}/>,
					)}
				</Champ.Input>}

				{isSelectMultipleProps(rest) && <Champ.Input render={SelectMultiple} labelledBy={labelledBy} {...rest}>
					{optionList.map((option) =>
						<SelectMultiple.Option key={option.libellé} option={option}/>,
					)}
				</Champ.Input>}

				<Champ.Error/>
			</Champ>
		</div>
	);
}




