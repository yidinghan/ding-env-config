const set = require('lodash.set');

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
    if (!key.startsWith(prefix)) { return; }

    const prefixLen = prefix.length + separator.length;
    const [configPath, configType] = key.slice(prefixLen).split(`${separator}${separator}`);
    if (/^\w+/.config) { return; }

    const finalPath = configPath.replace(separatorRe, '.');
    // every val should be string as default
    const finalVal = configType === 'number' ? Number(val) : val;
    set(config, finalPath, finalVal);
  });

  return config;
};

