<template>
  <ul class="pagination">
    <li class="page-item" @click="goToPage(prevPage)">&lt;</li>
    <li class="page-item" :class="{ active: page === curPage }" v-for="page in pageNums" :key="page" @click="goToPage(page)">{{ page }}</li>
    <li class="page-item" @click="goToPage(nextPage)">&gt;</li>
  </ul>
</template>

<script>
  import { reactive, toRefs, watchEffect } from 'vue';

  export default {
    name: 'paging',
    props: {
      curPage: {
        type: Number,
        default: 1,
      },
      pageSize: {
        type: Number,
        default: 10,
      },
      totalCount: {
        type: Number,
        default: 0,
      },
    },
    emits: ['goto'],
    setup(props, context) {
      let { pageNums, prevPage, nextPage } = usePagination(props);

      const state = reactive({
        pageNums,
        prevPage,
        nextPage,
      });

      watchEffect(() => {
        const { pageNums, prevPage, nextPage } = usePagination(props);
        state.pageNums = pageNums;
        state.prevPage = prevPage;
        state.nextPage = nextPage;
      });

      const goToPage = page => {
        context.emit('goto', { page });
      };

      return { ...toRefs(state), goToPage };
    },
  };

  function usePagination(props) {
    let { curPage, pageSize, totalCount } = props;

    const totalPages = Math.ceil(totalCount / pageSize);
    const { pageNums } = usePageBlock(curPage, totalPages);

    let prevPage = curPage - 1;
    if (prevPage < 1) {
      prevPage = 1;
    }
    let nextPage = curPage + 1;
    if (nextPage > totalPages) {
      nextPage = totalPages;
    }

    return { pageNums, prevPage, nextPage };
  }

  function usePageBlock(curPage, totalPages) {
    const blockSize = 10;
    const curBlock = Math.ceil(curPage / blockSize);

    let begin = (curBlock - 1) * blockSize + 1;
    let end = begin + blockSize - 1;
    if (end > totalPages) {
      end = totalPages;
    }
    const pageNums = reactive([]);
    for (let page = begin; page <= end; page++) {
      pageNums.push(page);
    }

    return { begin, end, pageNums };
  }
</script>

<style scoped>
  .pagination {
    display: inline-flex;
    align-items: center;
  }
  .pagination .page-item {
    display: block;
    width: 20px;
    height: 20px;
    margin: 0 5px;
    line-height: 20px;
    cursor: pointer;
    font-size: 14px;
  }
  .pagination .page-item.active {
    background: #333;
    color: #fff;
  }
</style>