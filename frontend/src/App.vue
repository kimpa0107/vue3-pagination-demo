<template>
  <suspense>
    <article-list></article-list>
  </suspense>
</template>

<script>
  import ArticleList from '/@views/articles.vue';

  export default {
    name: 'App',
    components: {
      ArticleList,
    },
  };
</script>
