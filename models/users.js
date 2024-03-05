// const { DataTypes } = require('sequelize');

// module.exports = (app) => {
//   const Users = app.db.define('Users', {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true
// }, name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: {
//         notEmpty: true
//       }
//     },
//     password: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: {
//         notEmpty: true
//       }
// }, email: {
//       type: DataTypes.STRING,
//       unique: true,
//       allowNull: false,
//       validate: {
//         notEmpty: true
//       }
// } });
//   return Users;
// };

const bcrypt = require('bcrypt')
const { DataTypes } = require('sequelize');

module.exports = (app) => {
  const Users = app.db.define('Users', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      },
      set(value) {
        const salt = bcrypt.genSaltSync();
        const password = bcrypt.hashSync(value, salt)
        this.setDataValue('password',password)
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  });

  // Defina as associações dentro da função associate
  Users.associate = (models) => {
    Users.hasMany(models.Tasks);
    // Outras associações conforme necessário
  };

  return Users;
};

