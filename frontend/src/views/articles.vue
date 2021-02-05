<template>
  <div class="container">
    <div>current page: {{ pageInfo.page }}</div>
    <div class="articles">
      <ul>
        <li v-for="item in articles" :key="item.id">{{ item.title }}</li>
      </ul>
    </div>

    <pagination
      :cur-page="pageInfo.page"
      :page-size="pageInfo.page_size"
      :total-count="pageInfo.total_count"
      @goto="goToPage"
    ></pagination>
  </div>
</template>

<script>
  import { useArticles } from '/@api/article';
  import Pagination from '/@components/pagination.vue';

  export default {
    name: 'article-list',
    components: {
      Pagination,
    },
    async setup() {
      let { getArticles, articles, pageInfo } = useArticles();
      await getArticles({ page: pageInfo.value.page });

      const goToPage = ({ page }) => {
        pageInfo.value.page = page;
        getArticles({ page });
      };

      return { articles, pageInfo, goToPage };
    },
  };
</script>
