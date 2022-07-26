import classNames from 'classnames';
import React, { useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import styles from '~/client/components/ui/Accordion/AccordionComponent.module.css';
import { AngleDownIcon } from '~/client/components/ui/Icon/angle-down.icon';
import { AngleUpIcon } from '~/client/components/ui/Icon/angle-up.icon';


interface AccordionProps {
  customLabel?: (isOpen: boolean) => string | undefined
  customButtonClassName?: (isOpen: boolean) => string
}
export function AccordionComponent({ children, customLabel, customButtonClassName } : React.PropsWithChildren<AccordionProps>) {
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

  function buttonLabel () {
    const defaultLabel = isOpen ? 'Voir moins' : 'Voir plus';
    if (customLabel) {
      return customLabel(isOpen) || defaultLabel;
    }
    return defaultLabel;
  }

  let buttonClassName = styles.accordionButton;
  if (customButtonClassName) {
    buttonClassName += ` ${customButtonClassName(isOpen)}`;
  }

  return (
    <>
      <div className={classNames({ [styles.open]: isOpen, [styles.closed]: !isOpen })}
        id={`section-${ariaId}`}
        role="region"
        aria-labelledby={`accordion-${ariaId}`}>
        {children}
      </div>
      <button className={buttonClassName}
        ref={ref}
        onClick={toggleAccordion} 
        type="button" 
        aria-expanded={isOpen}
        aria-controls={`section-${ariaId}`} 
        id={`accordion-${ariaId}`}>
        <span className={styles.accordionButtonLabel}>{ buttonLabel() }</span>
        {isOpen ? <AngleUpIcon color="currentColor"/> : <AngleDownIcon color="currentColor"/>}
      </button>
    </>
  );
}
