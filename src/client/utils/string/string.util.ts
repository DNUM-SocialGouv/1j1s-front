String.prototype.toHtml = function (this: string) {
  return this.trim().replaceAll('\n', '<br />');
};

String.prototype.appendOrRemoveSubStr = function (this: string, subStr: string) {
  const currentString = this.split(',').filter((element) => element);
  const indexOfValue = currentString.indexOf(subStr);
  if (indexOfValue >= 0) {
    currentString.splice(indexOfValue, 1);
  } else {
    currentString.push(subStr);
  }

  return currentString.join(',');
};

export {};
