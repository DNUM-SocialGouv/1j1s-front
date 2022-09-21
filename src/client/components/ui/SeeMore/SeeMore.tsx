import classNames from 'classnames';
import React, { useMemo, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { CommonProps } from '~/client/components/props';
import styles from '~/client/components/ui/SeeMore/SeeMoreComponent.module.scss';

import { Icon } from '../Icon/Icon';


interface SeeMoreProps extends CommonProps {
  overridedClosedLabel?: string
  overridedOpenedLabel?: string
  additionalClosedButtonClassName?: string
}

export function SeeMore({ children, overridedClosedLabel, overridedOpenedLabel, additionalClosedButtonClassName, className } : React.PropsWithChildren<SeeMoreProps>) {
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

  const buttonLabel: string = useMemo(() => {
    if(!isOpen) {
      if(overridedClosedLabel) {
        return overridedClosedLabel;
      } else {
        return 'Voir plus';
      }
    } else {
      if(overridedOpenedLabel) {
        return overridedOpenedLabel;
      } else {
        return 'Voir moins';
      }
    }
  }, [overridedClosedLabel, overridedOpenedLabel, isOpen]);

  return (
    <>
      <div className={classNames({ [styles.open]: isOpen, [styles.closed]: !isOpen }, className)}
        id={`section-${ariaId}`}
        role="region"
        aria-labelledby={`seeMore-${ariaId}`}>
        {children}
      </div>
      <button className={classNames(styles.seeMoreButton, !isOpen && additionalClosedButtonClassName)}
        ref={ref}
        onClick={toggleSeeMore}
        type="button" 
        aria-expanded={isOpen}
        aria-controls={`section-${ariaId}`} 
        id={`seeMore-${ariaId}`}>
        <span className={styles.seeMoreButtonLabel}> {buttonLabel} </span>
        <Icon name={isOpen ? 'angle-up' :'angle-down'}/>
      </button>
    </>
  );
}
