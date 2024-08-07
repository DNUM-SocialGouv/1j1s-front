import classNames from 'classnames';
import React from 'react';

import { Champ } from '~/client/components/ui/Form/Champ/Champ';
import { SelectMultiple, SelectMultipleProps } from '~/client/components/ui/Form/Select/SelectMultiple';
import { SelectSimple, SelectSimpleProps } from '~/client/components/ui/Form/Select/SelectSimple';

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

	function isSelectMultipleProps(rest: SelectSimpleProps | SelectMultipleProps): rest is SelectMultipleProps {
		return multiple === true;
	}

	function isSelectSimpleProps(rest: SelectSimpleProps | SelectMultipleProps): rest is SelectSimpleProps {
		return !multiple;
	}

	return (
		<div className={classNames(className)}>
			<Champ>
				<Champ.Label>
					{label}
					{labelComplement && <Champ.Label.Complement>{labelComplement}</Champ.Label.Complement>}
				</Champ.Label>
				{isSelectSimpleProps(rest) && <Champ.Input render={SelectSimple} {...rest}>
					{optionList.map((option) =>
						<SelectSimple.Option key={option.libellé} value={option.valeur}>{option.libellé}</SelectSimple.Option>,
					)}
				</Champ.Input>}

				{isSelectMultipleProps(rest) && <Champ.Input render={SelectMultiple} {...rest}>
					{optionList.map((option) =>
						<SelectMultiple.Option key={option.libellé} value={option.valeur}>{option.libellé}</SelectMultiple.Option>,
					)}
				</Champ.Input>}
				<Champ.Error/>
			</Champ>
		</div>
	);
}




