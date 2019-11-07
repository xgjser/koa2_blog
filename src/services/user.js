/**
 * @description user service
 */
const { DEFAULT_AVATAR } = require('../config/const');
const User = require('../models/user');

const userService = {
  /**
   * 创建用户
   * @param {string} loginId 账号
   * @param {string} loginPWD 密码
   * @param {string} nickName 昵称
   * @param {string} avatar 头像
   */
  async createUser() {
    console.log(12312313);

    // const result = await User.create({
    //   loginId,
    //   loginPWD,
    //   nickName,
    //   avatar
    // });
    // const data = result.dataValues;
    // console.log(data);
    // return data;
  },
  /**
   * 获取用户
   * @param {string} loginId 账号
   * @param {string} loginPWD 密码
   */
  async getUser(loginId, loginPWD) {
    const cond = { loginId };
    if (loginPWD) {
      cond.loginPWD = loginPWD;
    }
    const result = await User.findOne({
      attributes: ['id', 'loginId', 'loginPWD', 'nickName', 'avatar'],
      where: cond
    });

    if (!result) {
      return result;
    }

    const data = result.dataValues;

    return data;
  }
};

module.exports = userService;