const {promisify} = require('util');
let constants = require('./constants');
const redis = require("redis");


let redisClient = {};
let redisCon = false;
if(constants.redisOn){
  redisClient = redis.createClient();
  redisClient.on("error", function (err) {
      console.log("Error " + err);
  });
}

function _checkRedis() {
  return new Promise(resolve => {
    redisClient.get(constants.redisCheckAttr,function(err, reply){
      resolve(reply);
    });
  });
}

async function testRedis() {
  let _chk = await _checkRedis();
  return _chk;
}


function checkRedis(){
  return testRedis();
}


module.exports = {
  connection: true, //redisCon,
  client: redisClient
};
