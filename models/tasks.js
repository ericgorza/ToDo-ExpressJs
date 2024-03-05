// const { DataTypes } = require('sequelize');

// module.exports = (app) => {
//   const Tasks = app.db.define('Tasks', {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true
//     },
//     title: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: {
//         notEmpty: true
//       }
//     },
//     done: {
//       type: DataTypes.BOOLEAN,
//       allowNull: false,
//       defaultValue: false
//     }
//   });

//   return Tasks;
// };

const { DataTypes } = require('sequelize');

module.exports = (app) => {
  const Tasks = app.db.define('Tasks', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    done: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  });

  // Defina as associações dentro da função associate
  Tasks.associate = (models) => {
    Tasks.belongsTo(models.Users, { foreignKey: 'userId' });
    // Outras associações conforme necessário
  };

  return Tasks;
};
