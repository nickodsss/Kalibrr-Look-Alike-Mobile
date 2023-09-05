'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Job.belongsTo(models.User, { foreignKey: 'authorId' })
      Job.belongsTo(models.Company, { foreignKey: 'companyId' })

      Job.hasMany(models.Skill, { foreignKey: 'jobId' })
    }
  }
  Job.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Title is required'
        },
        notEmpty: {
          msg: 'Title is required'
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Description is required'
        },
        notEmpty: {
          msg: 'Description is required'
        }
      }
    },
    companyId: DataTypes.INTEGER,
    authorId: DataTypes.STRING,
    jobType: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Job Type is required'
        },
        notEmpty: {
          msg: 'Job Type is required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Job',
  });
  return Job;
};