export default {
  setTitle(context, payload) {
    context.commit("setNewsTitle", payload);
  },
  async getArticles(context, payload) {
    let constructedUrl = payload.endpoint;
    constructedUrl += "?apiKey=API_KEY_HERE";

    if (typeof payload.country !== "undefined" && payload.country !== null)
      constructedUrl += "&country=" + payload.country;

    if (typeof payload.category !== "undefined" && payload.category != null)
      constructedUrl += "&category=" + payload.category;

    if (
      typeof payload.searchPhase !== "undefined" &&
      payload.searchPhase != null
    )
      constructedUrl += "&q=" + payload.searchPhase;

    const fullUrl = "https://newsapi.org/v2/" + constructedUrl;

    console.log(fullUrl);

    const response = await fetch(fullUrl, {
      method: "GET",
    });

    const responseData = await response.json();
    //console.log(responseData.articles);

    // if (!response.ok) {
    //   const error = new Error(
    //     response.message || "A fatal server error occured"
    //   );
    //   throw error;
    // }

    if (responseData.status !== "ok") {
      const error = new Error(responseData.message || "A server error occured");
      throw error;
    }

    const articles = [];

    for (const key in responseData.articles) {
      const article = responseData.articles[key];

      const id = crypto.randomUUID();

      const newArticle = {
        id: id,
        source: article.source?.name,
        author: article.author,
        title: article.title,
        description: article.description,
        url: article.url,
        urlToImage: article.urlToImage,
        publishedAt: article.publishedAt,
      };

      articles.push(newArticle);
    }

    context.commit("setArticles", articles);
  },
};
