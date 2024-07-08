import classNames from 'classnames';
import React, {
	FocusEvent,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { useRefinementList, UseRefinementListProps } from 'react-instantsearch';
import { v4 as uuidv4 } from 'uuid';

import { KeyBoard } from '~/client/components/keyboard/keyboard.enum';
import {
	handleKeyBoardInteraction,
} from '~/client/components/keyboard/select.keyboard';
import { Checkbox } from '~/client/components/ui/Checkbox/Checkbox';
import { OptionSelect, Select } from '~/client/components/ui/Form/Select/Select';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { getCapitalizedItems } from '~/client/components/ui/Meilisearch/getCapitalizedItems';
import styles from '~/client/components/ui/Meilisearch/MeilisearchCustomRefinementList.module.scss';

interface MeilisearchCustomRefinementListProps extends React.ComponentPropsWithoutRef<'div'> {
	label: string
	'data-testid'?: string // FIXME (SULI 29-03-2024): a été ajouté pour faire passer des tests car pas de CSS inclus dans le JSDOM
}

export function MeilisearchCustomRefinementList(props: UseRefinementListProps & MeilisearchCustomRefinementListProps) {
	const { refine, items } = useRefinementList(props);
	const { label, className } = props;

	// TODO (BRUJ 08/07/2024): A supprimer lors du passage des options en composition
	const optionsList: Array<OptionSelect> = items.map((item) => ({
		libellé: item.label,
		valeur: item.value,
	}));

	const valuesItemsSelected = useMemo(() => {
		return items.filter((item) => item.isRefined)
			.map((item) => item.value);
	}, [items]);


	function onOptionSelected(option: HTMLElement) {
		const value = option.getAttribute('data-value') ?? '';
		value && refine(value);
	}

	return (
		<div className={classNames(className)} data-testid={props['data-testid']}>
			<Select label={label} optionList={optionsList} multiple onChange={(option) => onOptionSelected(option)} value={valuesItemsSelected}/>
		</div>
	);
}
