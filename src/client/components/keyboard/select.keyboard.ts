import React from 'react';

import { KeyBoard } from '~/client/components/keyboard/keyboard.enum';

export const setFocusToSelectButton = (currentElement: HTMLElement) => {
  if (currentElement.parentElement !== null && currentElement.parentElement.parentElement !== null) {
    currentElement.parentElement.parentElement.getElementsByTagName('button')[0].focus();
  }
};

export const handleKeyBoardInteraction = (event: React.KeyboardEvent<HTMLElement>, currentItem: HTMLElement, updateValues: () => void) => {
  if ( event.key === KeyBoard.TAB) event.preventDefault();
  else if (event.key === KeyBoard.ARROW_UP) {
    if (currentItem.previousElementSibling !== null) {
      const previousElement = currentItem.previousElementSibling as HTMLElement;
      previousElement.focus();
    }
    event.preventDefault();
  }
  else if (event.key === KeyBoard.ARROW_DOWN) {
    if (currentItem.nextElementSibling !== null) {
      const nextElement = currentItem.nextElementSibling as HTMLElement;
      nextElement.focus();
    }
    event.preventDefault();
  }
  else if (event.key === KeyBoard.SPACE || event.key === KeyBoard.ENTER ) {
    updateValues();
    event.preventDefault();
  }
};
