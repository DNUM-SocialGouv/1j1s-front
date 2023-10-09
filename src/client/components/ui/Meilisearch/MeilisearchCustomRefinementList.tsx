import classNames from 'classnames';
import React, {
	FocusEvent,
	useEffect,
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
import { Icon } from '~/client/components/ui/Icon/Icon';
import { getCapitalizedItems } from '~/client/components/ui/Meilisearch/getCapitalizedItems';
import styles from '~/client/components/ui/Meilisearch/MeilisearchCustomRefinementList.module.scss';

interface MeilisearchCustomRefinementListProps extends React.ComponentPropsWithoutRef<'div'> {
	label: string
}

export function MeilisearchCustomRefinementList(props: UseRefinementListProps & MeilisearchCustomRefinementListProps) {
	const { refine, items } = useRefinementList(props);
	const { label, className } = props;

	const [isOptionsOpen, setIsOptionsOpen] = useState(false);
	const buttonLabel = 'Sélectionnez vos choix';
	const labelledBy = useRef(uuidv4());
	const buttonRef = useRef<HTMLButtonElement>(null);
	const listBoxRef = useRef<HTMLUListElement>(null);

	useEffect(function setFocusOnOpen() {
		if (isOptionsOpen && items.length > 0) {
			const currentItem = listBoxRef.current;
			const firstElement = currentItem?.getElementsByTagName('li')[0];
			firstElement?.focus();
		}
	}, [isOptionsOpen, items.length]);

	function changeFocusToButtonElement(){
		buttonRef.current?.focus();
	}

	function handleKeyDown (event: React.KeyboardEvent<HTMLLIElement>){
		const currentItem = event.currentTarget;
		const updateValues = () => {
			const currentInput = currentItem.querySelector('input');
			if (currentInput === null) return;
			refine(currentInput.value);
		};
		handleKeyBoardInteraction(event, currentItem, updateValues);

		if (event.key === KeyBoard.ESCAPE) {
			changeFocusToButtonElement();
			setIsOptionsOpen(false);
		}
	}

	function onBlur(event: FocusEvent<HTMLDivElement>) {
		if (!event.currentTarget.contains(event.relatedTarget)) {
			setIsOptionsOpen(false);
		}
	}

	const renderOptionList = () => (
		<ul ref={listBoxRef} role="listbox" aria-multiselectable className={styles.options}>
			{items.length > 0 && items.map((item) => (
				<li
					tabIndex={-1}
					role="option"
					key={item.value}
					className={styles.option}
					aria-selected={item.isRefined}
					onKeyDown={handleKeyDown}
				>
					<Checkbox
						label={getCapitalizedItems(item.label)}
						value={item.value}
						checked={item.isRefined}
						onChange={() => refine(item.value)}
					/>
				</li>
			))}
		</ul>
	);


	if (items.length === 0) return null;
	return (
		<div className={classNames(className)}>
			<span id={labelledBy.current}>{label}</span>
			<div  className={styles.selectContainer} onBlur={onBlur}>
				<button
					type="button"
					ref={buttonRef}
					aria-haspopup="listbox"
					aria-expanded={isOptionsOpen}
					aria-labelledby={labelledBy.current}
					className={styles.button}
					onClick={() => setIsOptionsOpen(!isOptionsOpen)}
				>
					<span>{buttonLabel}</span>
					<Icon name={isOptionsOpen ? 'angle-up' : 'angle-down'}/>
				</button>
				{isOptionsOpen && renderOptionList()}
			</div>
		</div>
	);
}
