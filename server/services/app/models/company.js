'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Company.hasMany(models.Job, { foreignKey: 'companyId' })
      // Company.belongsToMany(models.User, {
      //   through: models.Job,
      //   foreignKey: 'companyId',
      //   otherKey: 'authorId'
      // })
    }
  }
  Company.init({
    name:
    {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Company Name is required'
        },
        notEmpty: {
          msg: 'Company Name is required'
        }
      }
    },
    companyLogo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Company Logo is required'
        },
        notEmpty: {
          msg: 'Company Logo is required'
        }
      }
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Location is required'
        },
        notEmpty: {
          msg: 'Location is required'
        }
      }
    }
    ,
    email: DataTypes.STRING,
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Description is required'
        },
        notEmpty: {
          msg: 'Description is required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Company',
  });
  return Company;
};