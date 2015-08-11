/**
 * Production environment settings
 *
 * This file can include shared settings for a production environment,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

var redisConf= require("redis-url").parse(process.env.REDISTOGO_URL);

module.exports = {

  /***************************************************************************
   * Set the default database connection for models in the production        *
   * environment (see config/connections.js and config/models.js )           *
   ***************************************************************************/

   models: {
     connection: 'mongo'
   },

  connections: {
    mongo: {
      url: process.env.MONGOLAB_URI
    },
    redis: {
      //url: process.env.REDISTOGO_URL,
      host: redisConf.hostname,
      port: redisConf.port,
      db: redisConf.database,
    }
  },

  session: {
    adapter: 'redis',
    host: redisConf.host,
    port: redisConf.port,
    db: redisConf.database,
    pass: redisConf.password,
    prefix: 'sess:'
  },

  filestore: {
    adapter: 'aws-s3',
    bucket: 'p8builds',
    pages: 'tektronix-metacatalog/pages'
  },

  jwt: {
    secret: process.env.JWT_SECRET,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    authKeySecret: process.env.JWT_AUTHKEY_SECRET
  },
  blueprints: {
    actions: true,
    rest:true,
    shortcuts: false
  },

  lightning: {
    appKey:'tektronix-metacatalog-client',
    host: redisConf.hostname,
    port: redisConf.port,
    pass: redisConf.password
  },

  /***************************************************************************
   * Set the port in the production environment to 80                        *
   ***************************************************************************/

   port: 80,

  /***************************************************************************
   * Set the log level in production environment to "silent"                 *
   ***************************************************************************/

  // log: {
  //   level: "silent"
  // }

};
