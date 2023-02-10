import classNames from 'classnames';
import React, {
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';
import { useRefinementList, UseRefinementListProps } from 'react-instantsearch-hooks-web';
import { v4 as uuidv4 } from 'uuid';

import { KeyBoard } from '~/client/components/keyboard/keyboard.enum';
import {
	handleKeyBoardInteraction,
	setFocusToSelectButton,
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
	const optionsRef = useRef<HTMLDivElement>(null);
	const listBoxRef = useRef<HTMLUListElement>(null);

	const closeOptionsOnClickOutside = useCallback((event: MouseEvent) => {
		if (!(optionsRef.current)?.contains(event.target as Node)) {
			setIsOptionsOpen(false);
		}
	}, []);

	const closeOptionsOnEscape = useCallback((event: KeyboardEvent) => {
		const currentItem = event.target as HTMLElement;
		if (event.key === KeyBoard.ESCAPE && isOptionsOpen) {
			setIsOptionsOpen(false);
			setFocusToSelectButton(currentItem);
		}
	}, [isOptionsOpen]);

	useEffect(function setEventListenerOnMount() {
		document.addEventListener('mousedown', closeOptionsOnClickOutside);
		document.addEventListener('keyup', closeOptionsOnEscape);

		return () => {
			document.removeEventListener('mousedown', closeOptionsOnClickOutside);
			document.removeEventListener('keyup', closeOptionsOnEscape);
		};
	}, [closeOptionsOnClickOutside, closeOptionsOnEscape]);

	useEffect(function setFocusOnOpen() {
		if (isOptionsOpen) {
			const currentItem = optionsRef.current as HTMLDivElement;
			const firstElement = currentItem.getElementsByTagName('li')[0];
			firstElement.focus();
		}
	}, [isOptionsOpen]);

	const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLElement>) => {
		const currentItem = event.target as HTMLElement;
		const updateValues = () => {
			const currentInput = currentItem.querySelector('input');
			if (currentInput === null) return;
			refine(currentInput.value);
		};

		handleKeyBoardInteraction(event, currentItem, updateValues);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const renderOptionList = () => (
		<ul ref={listBoxRef} role="listbox" aria-multiselectable className={styles.options}>
			{items.map((item) => (
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

	return (
		<div className={classNames(className)}>
			<span id={labelledBy.current}>{label}</span>
			<div ref={optionsRef} className={styles.selectContainer}>
				<button
					type="button"
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
