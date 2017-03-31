const set = require('lodash.set');

const types = {
  boolean: Boolean,
  bool: Boolean,
  string: String,
  num: Number,
  number: Number,
};

/**
 * once there are somethings like `CONFIG_mongo_db` in env,
 * the codes below will set `config.mongo.db` to the env val
 * @param {object} [payload] - input arguments
 * @param {object} [payload.config={}] - default config object
 * @param {string} [payload.separator=_] - symbol between key path and prefix
 * @param {string} [payload.prefix=CONFIG] - prefix to match target environment
 * @returns {object} parse out config
 * @example
 * // export CONFIG_mongo_db=db1
 * const config = envConfig();
 * // {
 * //   "mongo": {
 * //     "db": "db1"
 * //   }
 * // }
 *
 * // export CONFIG_mongo_port__num=27017
 * const config = envConfig();
 * // {
 * //   "mongo": {
 * //     "port": 27017
 * //   }
 * // }
 *
 * // export CONFIG_mongo_flag=true
 * const config = envConfig();
 * // {
 * //   "mongo": {
 * //     "flag": "true"
 * //   }
 * // }
 *
 * // export CONFIG_mongo_flag__bool=true
 * const config = envConfig();
 * // {
 * //   "mongo": {
 * //     "flag": true
 * //   }
 * // }
 **/
const envConfig = (payload = {}) => {
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

module.exports = envConfig;
