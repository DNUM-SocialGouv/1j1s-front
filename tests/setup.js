Object.defineProperty(window, 'scrollTo', {
  value: function scrollTo () {
    const e = new Event('scroll');
    this.dispatchEvent(e);
  },
  writable: true,
});
