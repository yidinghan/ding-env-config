const _ = {
  set: require('lodash.set'),
  defaults: require('lodash.defaults'),
};

// once there are somethings like `CONFIG_mongo_db` in env,
// the codes below will turn `config.kafkaConsumer.handlerConcurrency`
// to the env val and val will be number
/**
 * envLoader
 *
 * @param {Object} option.setting - description
 * @returns {Object}
 */
module.exports = (option = {}) => {
  const opt = _.defaults(option, {
    setting: {},
    prefix: 'CONFIG',
    separator: '_',
  });
  const { setting, separator } = opt;
  const separatorRe = new RegExp(separator, 'g');

  _.each(process.env, (val, key) => {
    if (!key.startsWith(opt.prefix)) { return; }

    const prefixLen = opt.prefix.length + separator.length;
    const pathWithType = key.slice(prefixLen).split(`${separator}${separator}`);
    const envOpt = _.zipObject(['keyPath', 'valType'], pathWithType);
    if (!envOpt.keyPath) { return; }

    envOpt.keyPath = envOpt.keyPath.replace(separatorRe, '.');
    // every val should be string as default
    envOpt.finalVal = envOpt.valType === 'number' ? Number(val) : val;
    _.set(setting, envOpt.keyPath, envOpt.finalVal);
  });

  return setting;
};

