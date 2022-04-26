export class PageContextParamsException extends Error {
  constructor(param: string | undefined = undefined) {
    if (param) {
      super(`Missing param ${param} from page context`);
    } else {
      super('Missing page context');
    }
    this.name = 'PageContextParamsException';
  }
}
