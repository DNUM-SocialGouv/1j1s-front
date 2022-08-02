import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { CloseIcon } from '~/client/components/ui/Icon/close.icon';
import styles from '~/client/components/ui/Modal/ModalComponent.module.scss';

interface ModalProps {
  close: (...args: unknown[]) => unknown
  closeLabel?: string;
  closeTitle?: string;
  isOpen: boolean;
}

const MODAL_ANIMATION_TIME_IN_MS = 300;

export function ModalComponent({ children, className, close, closeLabel = 'Fermer', closeTitle = 'Fermer la modale', isOpen, ...rest }: ModalProps & React.HTMLAttributes<HTMLDialogElement>) {
  const modal = useRef<HTMLDialogElement>(null);
  const [lastFocusBeforeOpen, setLastFocusBeforeOpen] = useState<HTMLElement | null>(null);

  function disableDocumentBodyScroll(isOpen: boolean) {
    isOpen ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'visible';
  }

  window.addEventListener('keydown', (e) => {
    if (isOpen && e.key === 'Escape') close();
  });

  window.addEventListener('click', (e) => {
    if (isOpen && modal.current && getComputedStyle(modal.current).opacity === '1' && !modal.current.children[0].contains(e.target as Element)) {
      close();
    }
  });

  function trapModalFocus() {
    if (modal.current !== null) {
      const focusableElements = modal.current.querySelectorAll('button, [href], input, select, textarea, summary, [tabindex]:not([tabindex="-1"])');
      const firstFocusableElement = focusableElements[0] as HTMLElement;
      const firstFocusableElementAtOpen = focusableElements[1] as HTMLElement;
      const lastFocusableElement = focusableElements[focusableElements.length - 1] as HTMLElement;
      setTimeout(() => firstFocusableElementAtOpen.focus(), MODAL_ANIMATION_TIME_IN_MS);

      window.addEventListener('keydown', (e) => {
        if (e.key !== 'Tab') return;
        if (!e.shiftKey && document.activeElement === lastFocusableElement && firstFocusableElement) {
          firstFocusableElement.focus();
          return e.preventDefault();
        }

        if (e.shiftKey && document.activeElement === firstFocusableElement) {
          lastFocusableElement.focus();
          return e.preventDefault();
        }
      });
    }
  }

  useEffect(() => {
    if (isOpen) {
      setLastFocusBeforeOpen(document.activeElement as HTMLElement);
    } else {
      setTimeout(() => lastFocusBeforeOpen?.focus(), MODAL_ANIMATION_TIME_IN_MS);
    }
  }, [isOpen, lastFocusBeforeOpen]);

  useEffect(() => {
    disableDocumentBodyScroll(isOpen);
    trapModalFocus();
  }, [isOpen]);

  return createPortal(
    <dialog ref={modal} className={classNames(className, styles.modal)} open={isOpen} {...rest}>
      <div className={styles.modalBody}>
        <div className={classNames(className, styles.modalClose)}>
          <button id="closeModalButton" type="button" title={closeTitle} onClick={() => close() }>
            <span className={styles.modalCloseLabel}>{closeLabel}</span>
            <CloseIcon className={styles.modalCloseIcon}/>
          </button>
        </div>
        {children}
      </div>
    </dialog>,
    document.body,
  );
}

type TitleLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

function ModalTitle({ titleLevel = 'h1', children, className }: { titleLevel?: TitleLevel } & React.HTMLAttributes<HTMLTitleElement>) {
  return React.createElement(titleLevel, { className: classNames(className, styles.modalTitle) }, children);
}

function ModalContent({ children, className }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={classNames(className, styles.modalContent)}>{children}</div>;
}

function ModalFooter({ children, className }: React.HTMLAttributes<HTMLDivElement>) {
  return <footer className={classNames(className, styles.modalFooter)}>{children}</footer>;
}

ModalComponent.Title = ModalTitle;
ModalComponent.Content = ModalContent;
ModalComponent.Footer = ModalFooter;
