import classNames from 'classnames';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import { Icon } from '~/client/components/ui/Icon/Icon';
import styles from '~/client/components/ui/SeeMore/SeeMoreItemList.module.scss';

const SEE_MORE_LABEL_DEFAULT = 'Voir plus';
const SEE_LESS_LABEL_DEFAULT = 'Voir moins';
const NUMBER_OF_VISIBLE_ITEMS_DEFAULT = 3;

export interface SeeMoreProps extends React.ComponentPropsWithoutRef<'div'> {
	itemList: React.ReactNode[]
	numberOfVisibleItems: number
	seeMoreLabel?: string
	seeLessLabel?: string
	seeMoreAriaLabel: string
	seeLessAriaLabel: string
}

export default function SeeMoreItemList(props: SeeMoreProps) {
	const {
		itemList,
		numberOfVisibleItems = NUMBER_OF_VISIBLE_ITEMS_DEFAULT,
		seeMoreLabel = SEE_MORE_LABEL_DEFAULT,
		seeLessLabel = SEE_LESS_LABEL_DEFAULT,
		seeMoreAriaLabel,
		seeLessAriaLabel,
		className,
		...rest
	} = props;
	const ariaId = useRef(uuidv4());
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
	}, [isOpen]);

	const buttonLabel = useMemo(() => isOpen ? seeLessLabel : seeMoreLabel,
		[seeMoreLabel, seeLessLabel, isOpen]);
	const buttonAriaLabel = useMemo(() => isOpen ? seeLessAriaLabel : seeMoreAriaLabel,
		[isOpen, seeLessAriaLabel, seeMoreAriaLabel]);

	if (!itemList || itemList.length <= 0) return null;
	return (
		<>
			{itemListToDisplay.length > 0 &&
          <div
          	ref={divRef}
          	id={`section-${ariaId.current}`}
          	{...rest}
          >
          	<ul className={styles.itemList}>
          		{itemListToDisplay?.map((element, index) =>
          			<li key={index}>{element}</li>,
          		)}
          	</ul>
          </div>
			}
			{itemList.length > numberOfVisibleItems &&
          <ButtonComponent className={classNames(styles.seeMoreButton, className)}
          	appearance={'quaternary'}
          	label={buttonLabel}
          	icon={isOpen ? <Icon name={'angle-up'}/> : <Icon name={'angle-down'}/>}
          	iconPosition={'right'}
          	onClick={toggle}
          	type="button"
          	aria-expanded={isOpen}
          	aria-controls={`section-${ariaId.current}`}
          	aria-label={buttonAriaLabel}>
          </ButtonComponent>
			}
		</>
	);
}
