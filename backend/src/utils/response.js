const success = (ctx, data = null) => {
  responseWithCtx(ctx, 0, 'OK', data);
};

const fail = (ctx, errcode, errmsg) => {
  responseWithCtx(ctx, errcode, errmsg, null);
};

const responseWithCtx = (ctx, errcode, errmsg, data) => {
  ctx.header['Content-Type'] = 'application/json';
  ctx.body = common(errcode, errmsg, data);
};

const common = (errcode, errmsg, data = null) => {
  let result = {
    errcode,
    errmsg,
  };
  if (errcode === 0 && data !== null) {
    result.data = data;
  }
  return result;
};

module.exports = {
  success,
  fail,
};