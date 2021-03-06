import classNames from 'classnames';
import React, { useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import styles from '~/client/components/ui/Accordion/AccordionComponent.module.css';
import { AngleDownIcon } from '~/client/components/ui/Icon/angle-down.icon';
import { AngleUpIcon } from '~/client/components/ui/Icon/angle-up.icon';


export function AccordionComponent({ children } : React.PropsWithChildren) {
  const ref = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const ariaId = uuidv4();

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
      <div className={classNames({ [styles.open]: isOpen, [styles.closed]: !isOpen })}
        id={`section-${ariaId}`}
        role="region"
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
