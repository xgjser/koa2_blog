const { db, Sequelize } = require('./db');

const Category = db.define('category', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING(20),
    allowNull: false,
    unique: 'name'
  },
  level: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  parentId: {
    type: Sequelize.UUID,
    allowNull: true
  }
});

module.exports = Category;
