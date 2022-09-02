import React, { useState } from 'react';
// eslint-disable-next-line import/named
import { useRefinementList, UseRefinementListProps } from 'react-instantsearch-hooks-web';

import { AngleDownIcon } from '~/client/components/ui/Icon/angle-down.icon';
import { AngleUpIcon } from '~/client/components/ui/Icon/angle-up.icon';
import styles from '~/client/components/ui/Meilisearch/MeilisearchRefinementSelect.module.scss';


export function MeilisearchCustomRefinementList(props: UseRefinementListProps & { label: string }) {
  const { refine, items } = useRefinementList(props);
  const { label } = props;
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const buttonLabel = 'Sélectionnez vos choix';
  return (
    <>
      <div className={styles.selectWrapper}>
        <label className={styles.selectLabel}>{label}</label>
        <div className={styles.selectContainer}>
          <button
            type="button"
            aria-haspopup="listbox"
            aria-expanded={isOptionsOpen}
            className={styles.button}
            onClick={() => setIsOptionsOpen(!isOptionsOpen)}
          >
            <span data-testid='Select-Placeholder'>{buttonLabel}</span>
            {isOptionsOpen ? <AngleUpIcon/> : <AngleDownIcon/>}
          </button>
          <ul style={{ display: isOptionsOpen ? '' : 'none' }}
            className={isOptionsOpen ? styles.listBox : ''}>
            {items.map((item) => (
              <li key={item.value} className={styles.list}>
                <label className={styles.checkbox}>
                  <input
                    checked={item.isRefined}
                    type="checkbox"
                    value={item.value}
                    onChange={() => {
                      refine(item.value);
                    }}
                  />
                  <span className={styles.label}>{item.label}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
