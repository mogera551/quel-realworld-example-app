
export const html = `
<div class="article-preview">
  <div class="article-meta">
    <a data-bind="href:article.author.profileHash|encode"><img data-bind="src:article.author.image" /></a>
    <div class="info">
      <a data-bind="href:article.author.profileHash|encode" class="author">{{ article.author.username }}</a>
      <span class="date">{{ article.createdAt }}</span>
    </div>
    <button class="btn btn-outline-primary btn-sm pull-xs-right">
      <i class="ion-heart"></i> {{ article.favoritesCount }}
    </button>
  </div>
  <a data-bind="href:article.detailHash|encode" class="preview-link">
    <h1>{{ article.title }}</h1>
    <p>{{ article.description }}</p>
    <span>Read more...</span>
    <ul class="tag-list">
      {{ loop:article.tagList }}
        <li class="tag-default tag-pill tag-outline">{{ article.tagList.* }}</li>
      {{ endloop: }}
    </ul>
  </a>
</div>
`;

const PREFIX_HASH = '#';

export class State {
  article;
  get "article.detailHash"() {
    return PREFIX_HASH + `/article/${this.article.slug}`;
  }
  get "article.author.profileHash"() {
    return PREFIX_HASH + `/profile/${this.article.author.username}`;
  }
}
