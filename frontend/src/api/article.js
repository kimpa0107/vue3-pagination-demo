import { reactive, toRefs } from 'vue';
import request from '/@utils/request';

export const _getArticles = (query = {}) => {
  return request({
    url: `/articles`,
    method: 'GET',
    params: query,
  });
};

export const useArticles = () => {
  const state = reactive({
    error: null,
    articles: [],
    pageInfo: {
      page: 1,
      page_size: 10,
      total_count: 0,
      total_pages: 1,
    },
  });

  const getArticles = async query => {
    try {
      const res = await _getArticles(query);
      const { errcode, errmsg, data } = res;
      state.pageInfo = data.pagination;
      state.articles = data.items;
    } catch (err) {
      state.error = err;
    }
  };

  return { ...toRefs(state), getArticles };
};