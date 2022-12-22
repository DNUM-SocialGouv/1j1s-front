import classNames from 'classnames';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { KeyBoard } from '~/client/components/keyboard/keyboard.enum';
import { HtmlHeadingTag } from '~/client/components/props';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import { Icon } from '~/client/components/ui/Icon/Icon';
import styles from '~/client/components/ui/Modal/ModalComponent.module.scss';

interface ModalProps {
  isOpen: boolean;
  close: (...args: unknown[]) => unknown
  closeLabel?: string;
  closeTitle?: string;
  unMountModal?: boolean
}

const MODAL_ANIMATION_TIME_IN_MS = 300;

export function ModalComponent({ children, className, close, closeLabel = 'Fermer', closeTitle = 'Fermer la modale', unMountModal = true, isOpen, ...rest }: ModalProps & React.HTMLAttributes<HTMLDialogElement>) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [lastFocusBeforeOpen, setLastFocusBeforeOpen] = useState<HTMLElement | null>(null);

  function disableDocumentBodyScroll(isOpen: boolean) {
    document.body.style.overflow = isOpen ? 'hidden' : 'visible';
  }

  const closeModalOnClickOutside = useCallback((e: MouseEvent) => {
    if (modalRef.current && !(modalRef.current)?.contains(e.target as Node)) close();

  }, [modalRef, close]);

  const closeModalOnClickEscape = useCallback((e: KeyboardEvent) => {
    if (isOpen && e.key === KeyBoard.ESCAPE) close();

  }, [isOpen, close]);

  useEffect(function enableDocumentBodyWhenTheModalIsClosing() {
    return () => {
      disableDocumentBodyScroll((false));
    };
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', closeModalOnClickOutside);
    document.addEventListener('keydown', closeModalOnClickEscape);

    return () => {
      document.removeEventListener('mousedown', closeModalOnClickOutside);
      document.addEventListener('keydown', closeModalOnClickEscape);
    };
  }, [closeModalOnClickOutside, closeModalOnClickEscape]);

  function trapModalFocus() {
    if (modalRef.current !== null) {
      const focusableElements = modalRef.current.querySelectorAll('button, [href], input, select, textarea, summary, [tabindex]:not([tabindex="-1"])');
      const firstFocusableElement = focusableElements[0] as HTMLElement;
      const firstFocusableElementAtOpen = focusableElements[1] as HTMLElement;
      const lastFocusableElement = focusableElements[focusableElements.length - 1] as HTMLElement;
      if (firstFocusableElementAtOpen) setTimeout(() => firstFocusableElementAtOpen.focus(), MODAL_ANIMATION_TIME_IN_MS);

      window.addEventListener('keydown', (e) => {
        if (e.key !== KeyBoard.TAB) return;
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
    if (unMountModal) disableDocumentBodyScroll(isOpen);
    trapModalFocus();
  }, [isOpen, unMountModal]);

  return (
    <>
      {isOpen && createPortal(
        <dialog
          ref={modalRef}
          className={classNames(className, styles.modal)}
          open={isOpen}
          aria-modal="true"
          {...rest}>
          <div className={styles.modalBody}>
            <div className={classNames(className, styles.modalClose)}>
              <ButtonComponent
                appearance='tertiary'
                icon={<Icon name='close' />}
                iconPosition='right'
                label={closeLabel}
                title={closeTitle}
                onClick={() => close()}
              />
            </div>
            {children}
          </div>
        </dialog>,
        document.body,
      )}
    </>
  );
}

function ModalTitle({ titleAs = 'h1', children, className, id }: { titleAs?: HtmlHeadingTag } & React.HTMLAttributes<HTMLTitleElement>) {
  return React.createElement(titleAs, { className: classNames(className, styles.modalTitle), id }, children );
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
