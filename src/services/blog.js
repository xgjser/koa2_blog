const Blog = require('../models/blog');
const User = require('../models/user');
const Tag = require('../models/tag');
const TagBlog = require('../models/tagBlog');

const blogService = {
  /**
   * 创建博客
   * @param {string} title 博客标题
   * @param {string} cover 博客封面
   * @param {string} content 博客内容
   * @param {string} userId 创建人id
   * @param {string} tagIds 博客标签
   */
  async create ({
    title,
    cover = null,
    content,
    userId
  }) {
    const result = await Blog.create({
      title,
      cover,
      content,
      userId
    });

    const data = result.dataValues;

    return data;
  },
  /**
   * 获取指定博客
   * @param {string} id 博客id
   */
  async get (id) {
    const cond = { id };
    const result = await Blog.findOne({
      attributes: ['id', 'title', 'cover', 'content', 'userId'],
      where: cond,
      include: [
        {
          model: User,
          attributes: ['nickName', 'avatar'],
        }
      ]
    });

    if (!result) {
      return result;
    }

    const data = result.dataValues;

    return data;
  },
  /**
   * 根据条件分页查询
   * @param {string} title 博客标题
   * @param {string} tagId 标签Id
   * @param {int} pageIndex 分页页码
   * @param {int} pageSize 分页大小
   */
  async getListByPage ({ title, tagId, pageIndex = 0, pageSize = 10 }) {
    const condBlog = {};
    const condTag = {};
    if (title) {
      condBlog.title = title;
    }
    if (tagId) {
      condTag.id = tagId;
    }

    const result = await Blog.findAndCountAll({
      limit: pageSize,
      offset: pageSize * pageIndex,
      attributes: ['id', 'title', 'cover', 'content', 'userId'],
      where: condBlog,
      include: [
        {
          model: User,
          attributes: ['nickName', 'avatar'],
        },
        {
          model: Tag,
          attributes: ['name'],
          where: condTag
        }
      ]
    });
    if (!result) {
      return result;
    }
    let blogList = result.rows.map(row => row.dataValues);
    blogList = blogList.map(blogItem => {
      blogItem.user = blogItem.user.dataValues;
      blogItem.tags = blogItem.tags.map(t => t.dataValues);
      return blogItem
    })

    return {
      count: result.count,
      list: blogList
    };
  },
  /**
   * 删除博客
   * @param {string} id 博客id
   */
  async delete (id) {
    const cond = { id };
    const result = await Blog.destroy({
      where: cond
    });

    return result > 0;
  }
};

module.exports = blogService;
