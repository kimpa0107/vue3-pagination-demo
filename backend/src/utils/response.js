const success = (data = null) => {
  return common(0, 'OK', data);
};

const fail = (errcode, errmsg) => {
  return common(errcode, errmsg, null);
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