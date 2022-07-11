import React, { useRef, useState } from 'react';

import styles from '~/client/components/ui/Accordion/AccordionComponent.module.css';
import { AngleDownIcon } from '~/client/components/ui/Icon/angle-down.icon';
import { AngleUpIcon } from '~/client/components/ui/Icon/angle-up.icon';

interface AccordionComponentProps {
  ariaId: number
}

export function AccordionComponent({ ariaId, children } : React.PropsWithChildren<AccordionComponentProps>) {
  const ref = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  function toggleAccordion() {
    toggle(!isOpen);
  }

  function toggle(newValueOpen: boolean) {
    if (isOpen === newValueOpen) return;
    setIsOpen(newValueOpen);
    ref.current?.setAttribute('aria-expanded', `${isOpen}`);
  }

  return (
    <>
      <div className={isOpen ? styles.open : styles.closed}
        id={`section-${ariaId}`}
        role="region"
        aria-hidden={isOpen}
        aria-labelledby={`accordion-${ariaId}`}>
        {children}
      </div>
      <button className={styles.accordionButton}
        ref={ref}
        onClick={toggleAccordion} 
        type="button" 
        aria-expanded={isOpen}
        aria-controls={`section-${ariaId}`} 
        id={`accordion-${ariaId}`}>
        <span className={styles.accordionButtonLabel}>{isOpen ? 'Voir moins' : 'Voir plus'}</span>
        {isOpen ? <AngleUpIcon/> : <AngleDownIcon />}
      </button>
    </>
  );
}
