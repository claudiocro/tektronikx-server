module.exports = {
  log: {
    level: 'warn'
  },
  connections: {
    memory: {
      // lets use memory tests ...
      adapter: 'sails-disk'
    }
  },
  models: {
    connection: 'memory'
  },
  port: PORT,
  environment: 'test',

  // @TODO needs suport to csrf token
  csrf: false,

  // we dont need this configs in API test
  hooks: {
    grunt: false,
    views: false,
    cors: false,
    csrf: false,
    i18n: false,
    pubsub: false,
    session: false
  }
};
