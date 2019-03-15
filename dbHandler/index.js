const sequelize=require('sequelize')
const userTable=require('./user')
const sequelizeInstance = new sequelize('socialhub', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,
  
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
  
  });

sequelizeInstance.authenticate().then(()=>console.log('---------Connection Established successfully--------')).catch(err => {
    console.error('--------Unable to connect to the database:---------\n', err);
});

const usertable=createUser(sequelizeInstance)
function connectDB(){

sequelizeInstance.sync().then(()=>console.log("---------User Table Created Successfully------------")).catch(err=>console.log(err))
}
const postTable=postManager(sequelizeInstance)
function connectDB(){

  sequelizeInstance.sync().then(()=>console.log("---------post Table Created Successfully------------")).catch(err=>console.log(err))
  }
module.exports={sequelizeInstance,usertable,postTable,connectDB}