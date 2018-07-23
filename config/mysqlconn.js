module.exports = {
    'local' : {
      database:'cmsapp',
      username:'root',
      password:'password',
      options:{
        host: 'localhost',
        dialect: 'mysql',
        operatorsAliases: false,
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000
        }
      }
    },
    'staging':{
      database:'cmsapp',
      username:'root',
      password:'password',
      options:{
        host: 'localhost',
        dialect: 'mysql',
        operatorsAliases: false,
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000
        }
      }
    }
};
