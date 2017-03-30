const set = require('lodash.set');
const zipObject = require('lodash.zipobject');

// once there are somethings like `CONFIG_mongo_db` in env,
// the codes below will turn `config.kafkaConsumer.handlerConcurrency`
// to the env val and val will be number
/**
 * envLoader
 *
 * @param {Object} option.setting - description
 * @returns {Object}
 */
module.exports = (payload = {}) => {
  const { setting = {}, separator = '_', prefix = 'CONFIG' } = payload;
  const separatorRe = new RegExp(separator, 'g');

  Object.keys(process.env).forEach((key) => {
    const val = process.env[key];
    if (!key.startsWith(prefix)) { return; }

    const prefixLen = prefix.length + separator.length;
    const pathWithType = key.slice(prefixLen).split(`${separator}${separator}`);
    const envOpt = zipObject(['keyPath', 'valType'], pathWithType);
    if (!envOpt.keyPath) { return; }

    envOpt.keyPath = envOpt.keyPath.replace(separatorRe, '.');
    // every val should be string as default
    envOpt.finalVal = envOpt.valType === 'number' ? Number(val) : val;
    set(setting, envOpt.keyPath, envOpt.finalVal);
  });

  return setting;
};

