export const setFocusToSelectButton = (currentElement: HTMLElement) => {
  if (currentElement.parentElement !== null && currentElement.parentElement.parentElement !== null) {
    currentElement.parentElement.parentElement.getElementsByTagName('button')[0].focus();
  }
};
