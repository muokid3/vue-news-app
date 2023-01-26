<template>
  <base-dialog :show="!!error" title="An error occurred" @close="handleError">
    <p>{{ error }}</p>
  </base-dialog>

  <base-card>
    <h2>{{ title }}</h2>
    <div v-if="isLoading">
      <base-spinner></base-spinner>
    </div>

    <ul v-else-if="hasContent">
      <!-- show content here -->
      <li v-for="article in articles" :key="article.id">
        {{ article }}
      </li>
    </ul>

    <h4 v-else>There are no news at the moment</h4>
  </base-card>
</template>

<script>
import BaseCard from "../components/ui/BaseCard.vue";
import BaseDialog from "../components/ui/BaseDialog.vue";

export default {
  components: { BaseCard, BaseDialog },
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  computed: {
    hasContent() {
      return !this.isLoading && this.$store.getters.hasContent;
    },
    title() {
      return this.$store.getters.title;
    },
    articles() {
      return this.$store.getters.articles;
    },
  },
  methods: {
    handleError() {
      this.error = null;
    },
    async loadHeadlines() {
      try {
        await this.$store.dispatch("getArticles", {
          endpoint: "top-headlines",
          country: "us",
          category: null,
          searchPhase: null,
        });
      } catch (error) {
        this.error = error.message || "Something went wrong";
      }
      this.isLoading = false;
    },
  },
  created() {
    this.$store.dispatch("setTitle", {
      title: "Top Headlines",
    });
    this.loadHeadlines();
  },
};
</script>