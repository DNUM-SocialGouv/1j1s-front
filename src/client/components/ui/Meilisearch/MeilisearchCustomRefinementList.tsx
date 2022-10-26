import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
// eslint-disable-next-line import/named
import { useRefinementList, UseRefinementListProps } from 'react-instantsearch-hooks-web';

import { KeyBoard } from '~/client/components/keyboard/keyboard.enum';
import { AngleDownIcon } from '~/client/components/ui/Icon/angle-down.icon';
import { AngleUpIcon } from '~/client/components/ui/Icon/angle-up.icon';
import { getCapitalizedItems } from '~/client/components/ui/Meilisearch/getCapitalizedItems';
import styles from '~/client/components/ui/Meilisearch/MeilisearchCustomRefinementList.module.scss';


export function MeilisearchCustomRefinementList(props: UseRefinementListProps & { label: string } & React.HTMLAttributes<HTMLDivElement>) {
  const { refine, items } = useRefinementList(props);

  const { label } = props;
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const buttonLabel = 'Sélectionnez vos choix';
  const optionsRef = useRef<HTMLDivElement>(null);

  const closeOptionsOnClickOutside = useCallback((event: MouseEvent) => {
    if (!(optionsRef.current)?.contains(event.target as Node)) {
      setIsOptionsOpen(false);
    }
  }, []);

  const closeOptionsOnEscape = useCallback((event: KeyboardEvent) => {
    if (event.key === KeyBoard.ESCAPE) {
      setIsOptionsOpen(false);
    }
  }, []);

  useEffect(function setEventListenerOnMount() {
    document.addEventListener('mousedown', closeOptionsOnClickOutside);
    document.addEventListener('keyup', closeOptionsOnEscape);

    return () => {
      document.removeEventListener('mousedown', closeOptionsOnClickOutside);
      document.removeEventListener('keyup', closeOptionsOnEscape);
    };
  }, [closeOptionsOnClickOutside, closeOptionsOnEscape]);

  return (
    <>
      <div className={props.className} >
        <label className={styles.selectLabel}>{label}</label>
        <div ref={optionsRef} className={styles.selectContainer}>
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
                  <span className={styles.label}>{getCapitalizedItems(item.label)}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
