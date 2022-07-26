String.prototype.toHtml = function (this: string) {
  return this.trim().replaceAll('\n', '<br />');
};

String.prototype.appendOrRemoveSubStr = function (this: string, subStr: string) {
  console.log('value lol: ', this);
  const currentString = this.split(',').filter((element) => element);
  console.log('currentString: ', currentString);
  const indexOfValue = currentString.indexOf(subStr);
  console.log('indexOfValue: ', indexOfValue);
  if (indexOfValue >= 0) {
    currentString.splice(indexOfValue, 1);
  } else {
    currentString.push(subStr);
  }

  return currentString.join(',');
};

export {};
