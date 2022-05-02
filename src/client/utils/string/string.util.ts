String.prototype.toHtml = function (this: string) {
  return this.trim().replaceAll('\n', '<br />');
};

export {};
