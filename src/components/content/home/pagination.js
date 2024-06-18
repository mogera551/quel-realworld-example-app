

export const html = `
<ul class="pagination">
  {{ loop:pages }}
  <li class="page-item" data-bind="class.active: pages.*.active">
    <a class="page-link" data-bind="activePage">{{ pages.* }}</a>
  </li>
  {{ endloop: }}
</ul>
`;

export class State {
  /** @type {number} number of item in a page */
  numberInPage;
  /** @type {number} number of item */
  count;
  /** @type {number} current active page number */
  currentPage; // 1-based

  /** @type {number} number of page */
  get pageCount() {
    return Math.ceil((this.count - this.numberInPage + 1) / this.numberInPage);
  }
  /** @type {number[]} enumlate page number, from 1 to pageCount, ex. 1,2,3... */
  get pages() {
    return [...Array(this.pageCount)].map((_, i) => i + 1);
  }
  /** @type {boolean} the page number is active */
  get "pages.*.active"() {
    return this.currentPage === this["pages.*"];
  }

  /**
   * activate page
   * @param {number} page 
   */
  active(page) {
    this.currentPage = page;
  }
  /**
   * activate page in loop
   */
  activePage() {
    this.active(this["pages.*"]);
  }

  /** @type {Object<string, string[]>} dependent properties */
  $dependentProps = {
    "pageCount": ["count", "numberInPage"],
    "pages": ["pageCount"],
    "pages.*.active": ["currentPage", "pages.*"],
  };

}
