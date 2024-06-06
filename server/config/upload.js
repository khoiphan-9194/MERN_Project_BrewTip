const configs = {
    development: {
      SERVER_URI: 'localhost:3001',
    },
    production: {
      SERVER_URI: 'URI',
    },
  };
  
  module.exports.config = configs[process.env.NODE_ENV];