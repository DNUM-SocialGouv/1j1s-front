export class AnalyticsServiceFake {
  private tag;

  constructor() {
    this.tag = this.newTag();
  }

  private newTag() {
    return {
      click: { send: () => ({}) },
      dispatch: () => ({}),
      page: { set: () => ({}) },
    };
  }
  //@param info: {name: string, level2?: string, chapter1?: string, chapter2?: string, chapter3?: string, customObject?: any}
  sendPage() {
    this.tag.page.set();
    this.tag.dispatch();
  }
  //@param info: {elem: any, name: string, level2?: string, chapter1?: string, chapter2?: string, chapter3?: string, type: string, customObject?: any}
  sendClick() {
    this.tag.click.send();
  }
}
