import classNames from 'classnames';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { CommonProps } from '~/client/components/props';
import styles from '~/client/components/ui/SeeMore/SeeMoreItemList.module.scss';
import { TextIcon } from '~/client/components/ui/TextIcon/TextIcon';

const SEE_MORE_LABEL_DEFAULT = 'Voir plus';
const SEE_LESS_LABEL_DEFAULT = 'Voir moins';
const NUMBER_OF_VISIBLE_ITEMS_DEFAULT = 3;

export interface SeeMoreProps extends CommonProps {
	itemList: React.ReactNode[]
	numberOfVisibleItems: number
  seeMoreLabel?: string
  seeLessLabel?: string
	seeMoreAriaLabel: string
	seeLessAriaLabel: string
}

export default function SeeMoreItemList(props: React.PropsWithChildren<SeeMoreProps>) {
	const {
		itemList,
		numberOfVisibleItems = NUMBER_OF_VISIBLE_ITEMS_DEFAULT,
		seeMoreLabel = SEE_MORE_LABEL_DEFAULT,
		seeLessLabel = SEE_LESS_LABEL_DEFAULT,
		seeMoreAriaLabel,
		seeLessAriaLabel,
		className,
	} = props;
	const ariaId = useRef(uuidv4());
	const buttonRef = useRef<HTMLButtonElement>(null);
	const divRef = useRef<HTMLDivElement>(null);
	const [isOpen, setIsOpen] = useState(false);

	const completeItemList = useMemo(() => itemList, [itemList]);

	const visibleItemList = useMemo(() => {
		return itemList?.slice(0, numberOfVisibleItems);
	}, [itemList, numberOfVisibleItems]);


	const itemListToDisplay = useMemo(() => {
		if (isOpen) return completeItemList;
		return visibleItemList;
	}, [isOpen, completeItemList, visibleItemList]);

	const toggle = useCallback(() => {
		if (isOpen && divRef.current) {
			const divPosition = divRef.current.getBoundingClientRect();
			window.scrollBy({ behavior: 'smooth', top: -divPosition.height });
		}
		setIsOpen(!isOpen);
		buttonRef.current?.setAttribute('aria-expanded', `${isOpen}`);
	}, [isOpen]);

	const buttonLabel = useMemo(() => isOpen ? seeLessLabel : seeMoreLabel,
		[seeMoreLabel, seeLessLabel, isOpen]);
	const buttonAriaLabel = useMemo(() => isOpen ? seeLessAriaLabel : seeMoreAriaLabel,
		[isOpen, seeLessAriaLabel, seeMoreAriaLabel]);

	if (!itemList || itemList.length <= 0) return null;
	return (
		<>
			<div
	      ref={divRef}
				id={`section-${ariaId.current}`}>
				<ul className={styles.itemList}>
					{itemListToDisplay?.map((element, index) =>
						<li key={index}>{element}</li>,
					)}
				</ul>
			</div>
			{itemList.length > numberOfVisibleItems &&
				<button className={classNames(styles.seeMoreButton, className)}
					ref={buttonRef}
					onClick={toggle}
					type="button"
					aria-expanded={isOpen}
					aria-controls={`section-${ariaId.current}`}
					aria-label={buttonAriaLabel}>
					<TextIcon className={styles.seeMoreButtonLabel} icon={isOpen ? 'angle-up' : 'angle-down'}>{buttonLabel}</TextIcon>
				</button>
			}
		</>
	);
}
