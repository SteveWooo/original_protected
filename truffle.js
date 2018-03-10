const config = require('./config');

module.exports = {
  networks: {
    development: {
      host: config.rpc.host,
      port: config.rpc.port,
      network_id: "13",
      from : config.eth.defaultAccount
    }
  }
};
