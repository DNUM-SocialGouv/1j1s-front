import classNames from 'classnames';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { KeyBoard } from '~/client/components/keyboard/keyboard.enum';
import { HtmlHeadingTag } from '~/client/components/props';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import { Icon } from '~/client/components/ui/Icon/Icon';
import styles from '~/client/components/ui/Modal/ModalComponent.module.scss';

interface ModalProps extends React.ComponentPropsWithoutRef<'dialog'> {
	isOpen: boolean;
	close: (...args: unknown[]) => unknown
	closeLabel?: string;
	closeTitle?: string;
	keepModalMounted?: boolean
}

export function ModalComponent(props: ModalProps) {
	const {
		children,
		className,
		close,
		closeLabel = 'Fermer',
		closeTitle = 'Fermer la modale',
		keepModalMounted = false,
		isOpen,
		...rest
	} = props;
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
			disableDocumentBodyScroll(false);
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
			const lastFocusableElement = focusableElements[focusableElements.length - 1] as HTMLElement;

			// si focus sur dernier élément et qu'il est expand avec enfant alors compute de nouveau
			// autre piste : laisser le focus de façon natif, et intervenir seulement si le focus est sur un élément externe à la modale qu'on ne veut pas

			window.addEventListener('keydown', (e) => {
				if (!modalRef.current) return;
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
			lastFocusBeforeOpen?.focus();
		}
	}, [isOpen, lastFocusBeforeOpen]);

	useEffect(() => {
		disableDocumentBodyScroll(isOpen);
		// trapModalFocus();
	}, [isOpen]);

	return (
		<>
			{(isOpen || keepModalMounted) && createPortal(
				<dialog
					ref={modalRef}
					className={classNames(className, styles.modal)}
					open={isOpen}
					aria-modal="true"
					{...rest}>
					<div className={styles.modalBody}>
						<div className={classNames(className, styles.modalClose)}>
							<ButtonComponent
								appearance="quaternary"
								icon={<Icon name="close"/>}
								iconPosition="right"
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

function ModalTitle(props: { titleAs?: HtmlHeadingTag } & React.ComponentPropsWithoutRef<HtmlHeadingTag>) {
	const {
		titleAs = 'h1',
		children,
		className,
		id,
		...rest
	} = props;
	return React.createElement(titleAs, { className: classNames(className, styles.modalTitle), id, ...rest }, children);
}

function ModalContent({ children, className, ...rest }: React.ComponentPropsWithoutRef<'div'>) {
	return <div className={classNames(className, styles.modalContent)} {...rest}>{children}</div>;
}

function ModalFooter({ children, className, ...rest }: React.ComponentPropsWithoutRef<'footer'>) {
	return <footer className={classNames(className, styles.modalFooter)} {...rest}>{children}</footer>;
}

ModalComponent.Title = ModalTitle;
ModalComponent.Content = ModalContent;
ModalComponent.Footer = ModalFooter;
