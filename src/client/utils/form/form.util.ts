FormData.prototype.toRecord = function(this) {
  const formEntries = this.entries();
  return Object.fromEntries(formEntries) as unknown as Record<string, string>;
};

export {};
