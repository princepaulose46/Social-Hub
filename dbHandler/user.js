const sequelize=require('sequelize')

createUser=function (sequelizeInstance){
  const UserTable =  sequelizeInstance.define('user', 
  {name:sequelize.STRING,
    password:sequelize.STRING,
    email:sequelize.STRING,
    dob:sequelize.DATE},
    {
      indexes:[
        {
          unique:true,
          fields:['email']
        }
      ] 
    }
    );
    return UserTable;
  }
  
  
  postManager=function (sequelizeInstance){

  const postTable =  sequelizeInstance.define('posts', 
    {title:sequelize.STRING,status:sequelize.STRING}
    );
    return postTable;
  }
  
  module.exports=createUser,postManager

