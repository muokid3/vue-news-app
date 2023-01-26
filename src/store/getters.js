export default {
  hasContent(state) {
    return state.articles && state.articles.length > 0;
  },
  title(state) {
    return state.title;
  },

  articles(state) {
    return state.articles;
  },
};
