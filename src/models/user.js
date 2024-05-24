'use strict';
const {
  Model
} = require('sequelize');

const bcrypt=require("bcrypt");
// requiring the bcrypt package
const {SALT}=require("../config/serverConfig");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    email: {
      type:DataTypes.STRING,
      allowNull:false,
      unique:true,
      validate:{
        isEmail:true
      }
    },
    password: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        len:[3,100]
      }
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  // beforeCreate is a hook or trigger which gets called before the 
  // data gets inserted in the row 
  // user is the row of the table to be inserted
  User.beforeCreate((user)=>{
    const encryptedPassword=bcrypt.hashSync(user.password,SALT);
    user.password=encryptedPassword;
  })
  return User;
};