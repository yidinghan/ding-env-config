const set = require('lodash.set');

const types = {
  string: String,
  num: Number,
  number: Number,
};

// once there are somethings like `CONFIG_mongo_db` in env,
// the codes below will turn `config.kafkaConsumer.handlerConcurrency`
// to the env val and val will be number
/**
 * envLoader
 *
 * @param {Object} option.config - description
 * @returns {Object}
 */
module.exports = (payload = {}) => {
  const { config = {}, separator = '_', prefix = 'CONFIG' } = payload;
  const separatorRe = new RegExp(separator, 'g');

  Object.keys(process.env).forEach((key) => {
    const val = process.env[key];
    const validPrefix = prefix + separator;
    if (!key.startsWith(validPrefix)) { return; }

    const [configPath, configType = 'string'] = key.slice(validPrefix.length)
      .split(`${separator}${separator}`);
    if (!(/^[a-zA-Z]+/.test(configPath) && configType in types)) { return; }

    const finalPath = configPath.replace(separatorRe, '.');
    // every val should be string as default
    const finalVal = types[configType](val);
    set(config, finalPath, finalVal);
  });

  return config;
};

