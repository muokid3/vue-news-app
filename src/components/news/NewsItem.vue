<template>
  <li>
    <div class="parent">
      <div class="children">
        <img :src="article.urlToImage" width="150" alt="Image" />
      </div>

      <div class="children">
        <div class="content">
          <h4>
            {{ article.title }}
          </h4>
          <p>
            {{ descString }}
          </p>

          <div class="foot">
            <p>
              Author: <i>{{ article.author }}</i>
            </p>
            <base-button mode="flat" :link="true" :to="articleLink">View Article</base-button>
          </div>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
import BaseButton from '../ui/BaseButton.vue';
export default {
  components: { BaseButton },
  props: ["article"],
  computed: {
    descString() {
      return this.article.description
        ? this.article.description.slice(0, 100) + "..."
        : this.article.description;
    },
    articleLink(){
        return "/articles/"+this.article.id;
    }
  },
};
</script>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
  list-style-type: none;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.parent {
  display: flex;
  width: 100%;
  height: 150px;
  align-items: center; /* Align Items Vertically */
  justify-content: space-between; /* Align Items Horizontally (with equal space in between each of them */
}
.children {
  display: flex;
}

.content {
  align-items: flex-start;
  width: 100%;
  margin: 10px 0px 0px 10px;
}

.foot{
    display: flex;
    justify-content: space-between;
}
</style>