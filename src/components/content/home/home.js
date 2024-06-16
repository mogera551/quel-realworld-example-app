
import * as articlePreview from './article-preview.js';

export const componentModules = {
  articlePreview
}

export const html = `
<div class="home-page">
  <div class="banner">
    <div class="container">
      <h1 class="logo-font">conduit</h1>
      <p>A place to share your knowledge.</p>
    </div>
  </div>

  <div class="container page">
    <div class="row">
      <div class="col-md-9">
        <div class="feed-toggle">
          <ul class="nav nav-pills outline-active">
            {{ if:authenticated }}
              <li class="nav-item">
                <a class="nav-link" href="">Your Feed</a>
              </li>
            {{ endif: }}
            <li class="nav-item">
              <a class="nav-link active" href="">Global Feed</a>
            </li>
          </ul>
        </div>

        {{ loop:articles }}
          <article-preview data-bind="
            props.article:articles.*
          "></article-preview>
        {{ endloop: }}


        <ul class="pagination">
          <li class="page-item active">
            <a class="page-link" href="">1</a>
          </li>
          <li class="page-item">
            <a class="page-link" href="">2</a>
          </li>
        </ul>
      </div>

      <div class="col-md-3">
        <div class="sidebar">
          <p>Popular Tags</p>

          <div class="tag-list">
            {{ loop:tags }}
            {{ endloop: }}
            <a href="" class="tag-pill tag-default">programming</a>
            <a href="" class="tag-pill tag-default">javascript</a>
            <a href="" class="tag-pill tag-default">emberjs</a>
            <a href="" class="tag-pill tag-default">angularjs</a>
            <a href="" class="tag-pill tag-default">react</a>
            <a href="" class="tag-pill tag-default">mean</a>
            <a href="" class="tag-pill tag-default">node</a>
            <a href="" class="tag-pill tag-default">rails</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
`;

const NUMBER_IN_PAGE = 10;

export class State {
  authenticated = false;
  articles = [];
  tags = [];
  articleCount = 0;
  articlesInPage = 10;
  currentPage = 1;

  get pageCount() {
    return Math.ceil((this.articleCount - NUMBER_IN_PAGE + 1) / NUMBER_IN_PAGE);
  }
  get pages() {
    return [...Array(this.pageCount)].map((_, i) => i + 1)
  }
  get "pages.*.offset"() {
    return this.$1 * NUMBER_IN_PAGE;
  }
  get "pages.*.active"() {
    return this.currentPage === this.$1;
  }
  $connectedCallback() {

  }

}