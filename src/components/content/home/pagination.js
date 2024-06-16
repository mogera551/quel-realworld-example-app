
import * as constant from '../../../common/const.js';

export const html = `
`;

export class State {
  numberInPage = constant.ARTICLES_IN_PAGE;
  count;
  currentPage; // 1-based
  get pageCount() {
    return Math.ceil((this.count - this.numberInPage + 1) / this.numberInPage);
  }
  get pages() {
    return [...Array(this.pageCount)].map((_, i) => i + 1);
  }
  get "pages.*.active"() {
    return this.currentPage === this["pages.*"];
  }

}
