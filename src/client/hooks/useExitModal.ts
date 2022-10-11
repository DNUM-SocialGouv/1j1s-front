import { RefObject, useEffect } from 'react';

import { KeyBoard } from '../components/keyboard/keyboard.enum';

export function useExitModal<E extends HTMLElement> (wrapperElement: RefObject<E>, isOpen: boolean, onExit: () => void) {
  useEffect(() => {
    function onGlobalClick (e: MouseEvent) {
      if (isOpen && wrapperElement.current && !(wrapperElement.current)?.contains(e.target as Node)) {
        onExit();
      }
    }
    function onTypeEscape (e: KeyboardEvent) {
      if (isOpen && e.key === KeyBoard.ESCAPE) {
        onExit();
      }
    }

    document.addEventListener('click', onGlobalClick);
    document.addEventListener('keydown', onTypeEscape);
    return () => {
      document.removeEventListener('click', onGlobalClick);
      document.addEventListener('keydown', onTypeEscape);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wrapperElement, isOpen]);
}
