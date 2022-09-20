import classNames from 'classnames';
import React, { useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { CommonProps } from '~/client/components/props';
import styles from '~/client/components/ui/SeeMore/SeeMoreComponent.module.scss';

import { Icon } from '../Icon/Icon';


interface SeeMoreProps extends CommonProps {
  customLabel?: (isOpen: boolean) => string | undefined
  customButtonClassName?: (isOpen: boolean) => string
}

export function SeeMore({ children, customLabel, customButtonClassName, className } : React.PropsWithChildren<SeeMoreProps>) {
  const ref = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const ariaId = uuidv4();

  function toggleSeeMore() {
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

  let buttonClassName = styles.seeMoreButton;
  if (customButtonClassName) {
    buttonClassName += ` ${customButtonClassName(isOpen)}`;
  }

  return (
    <>
      <div className={classNames({ [styles.open]: isOpen, [styles.closed]: !isOpen }, className)}
        id={`section-${ariaId}`}
        role="region"
        aria-labelledby={`seeMore-${ariaId}`}>
        {children}
      </div>
      <button className={buttonClassName}
        ref={ref}
        onClick={toggleSeeMore}
        type="button" 
        aria-expanded={isOpen}
        aria-controls={`section-${ariaId}`} 
        id={`seeMore-${ariaId}`}>
        <span className={styles.seeMoreButtonLabel}>{ buttonLabel() }</span>
        <Icon name={isOpen ? 'angle-up' :'angle-down'}/>
      </button>
    </>
  );
}
