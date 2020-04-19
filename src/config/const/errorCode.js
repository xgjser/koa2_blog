/**
 * @description 返回数据的错误码集合
 */

module.exports = {
  //用户不存在
  userNotExist: {
    code: 10001,
    message: '用户不存在'
  },
  //用户已存在
  userIsExist: {
    code: 10002,
    message: '用户已存在'
  },
  //用户信息验证失败
  userAuthError: {
    code: 10003,
    message: '用户信息验证失败'
  },
  //异常
  systemError: {
    code: 50000,
    message: '系统故障，请联系管理员'
  },
  //操作不允许
  systemRefuse: {
    code: 50001,
    message: '操作不允许'
  },
  //分类不存在
  categoryNotExist: {
    code: 10101,
    message: '分类不存在'
  },
  //分类已存在
  categoryIsExist: {
    code: 10102,
    message: '分类名已存在'
  },
};
