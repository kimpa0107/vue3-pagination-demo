const Koa = require('koa');
const Router = require('@koa/router');
const cors = require('@koa/cors');
const response = require('./utils/response');

const app = new Koa();
const router = new Router();

app.use(cors());

router.get('/articles', async (ctx, next) => {
  const PAGE_SIZE = 10;
  const TOTAL_COUNT = 110;
  const totalPages = Math.ceil(TOTAL_COUNT / PAGE_SIZE);
  const page = ~~ctx.query.page;
  const pagination = {
    page,
    page_size: PAGE_SIZE,
    total_count: TOTAL_COUNT,
  };

  if (page > totalPages) {
    ctx.body = response.success({
      items: [],
      pagination,
    });
    return;
  }

  let begin = (page - 1) * PAGE_SIZE;
  let end = begin + PAGE_SIZE;
  if (end > TOTAL_COUNT) {
    end = TOTAL_COUNT;
  }

  const articles = [];
  for (let i = begin; i < end; i++) {
    const num = i + 1;
    articles.push({
      id: num,
      title: `This is article title - ${num}`,
    });
    ctx.header['content-type'] = 'application/json';
    ctx.body = response.success({
      items: articles,
      pagination,
    });
  }
});

app.use(router.routes()).listen(3001);