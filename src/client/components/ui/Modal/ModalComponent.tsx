import classNames from 'classnames';
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

import { CloseIcon } from '~/client/components/ui/Icon/close.icon';
import styles from '~/client/components/ui/Modal/ModalComponent.module.scss';

export function ModalComponent({ children, className, isOpen, ...rest }: { isOpen: boolean } & React.HTMLAttributes<HTMLDialogElement>) {
  function disableDocumentBodyScroll() {
    isOpen ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'visible';
  }

  useEffect(() => {
    disableDocumentBodyScroll();
  });

  return createPortal(
    <dialog className={classNames(className, styles.modal)} open={isOpen} {...rest}>
      <div className={styles.modalBody}>
        {children}
      </div>
    </dialog>,
    document.body,
  );
}

interface ModalCloseProps {
  close: (...args: unknown[]) => unknown
  label?: string
  title?: string
}

function ModalClose({ className, close, label = 'Fermer', title = 'Fermer la modale' }: ModalCloseProps & React.HTMLAttributes<HTMLDivElement>) {
  return ( 
    <div className={classNames(className, styles.modalClose)}>
      <button type="button" title={title} onClick={() => close()}>
        <span className={styles.modalCloseLabel}>{label}</span>
        <CloseIcon className={styles.modalCloseIcon}/>
      </button>
    </div>
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

ModalComponent.Close = ModalClose;
ModalComponent.Content = ModalContent;
ModalComponent.Footer = ModalFooter;
ModalComponent.Title = ModalTitle;
