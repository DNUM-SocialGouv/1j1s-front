export class AnalyticsService {
  private tag;

  constructor() {
    this.tag = this.newTag();
  }

  private newTag() {
    try {
      return new window.ATInternet.Tracker.Tag();
    } catch(e) {
      return {
        click: { send: () => ({}) },
        dispatch: () => ({}),
        page: { set: () => ({}) },
      };
    }
  }
  //@param info: {name: string, level2?: string, chapter1?: string, chapter2?: string, chapter3?: string, customObject?: any}
  sendPage(name: string) {
    this.tag.page.set({ name });
    this.tag.dispatch();
  }
  //@param info: {elem: any, name: string, level2?: string, chapter1?: string, chapter2?: string, chapter3?: string, type: string, customObject?: any}
  sendClick(action: string) {
    this.tag.click.send({ name: action });
  }
}
