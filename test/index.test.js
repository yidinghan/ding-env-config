const { test } = require('ava');
const envConfig = require('../');

const ENV = {
  CONFIG_mongo_db: 'mongo.db1',
  CONFIG__mongo__db: 'mongo.db2',
  ACONFIG_mongo_db: 'mongo.db3',
  BCONFIG_mongo_port__number: '3434',
  CCONFIG_mongo_port__num: '3435',
  DCONFIG_mongo_flag__boolean: '1',
  ECONFIG_mongo_flag__bool: '',
};

test.before(() => {
  Object.assign(process.env, ENV);
});

test('should load mongo db', (t) => {
  const config = envConfig();
  t.deepEqual(config, {
    mongo: {
      db: 'mongo.db1',
    },
  });
});

test('should load mongo db with another separator', (t) => {
  const config = envConfig({ separator: '__' });
  t.deepEqual(config, {
    mongo: {
      db: 'mongo.db2',
    },
  });
});

test('should load mongo db with another prefix', (t) => {
  const config = envConfig({ prefix: 'ACONFIG' });
  t.deepEqual(config, {
    mongo: {
      db: 'mongo.db3',
    },
  });
});

test('should load mongo port with type number', (t) => {
  const config = envConfig({ prefix: 'BCONFIG' });
  t.deepEqual(config, {
    mongo: {
      port: 3434,
    },
  });
});

test('should load mongo db with type num', (t) => {
  const config = envConfig({ prefix: 'CCONFIG' });
  t.deepEqual(config, {
    mongo: {
      port: 3435,
    },
  });
});

test('should load mongo db with type bool', (t) => {
  const config = envConfig({ prefix: 'DCONFIG' });
  t.deepEqual(config, {
    mongo: {
      flag: true,
    },
  });
});

test('should load mongo db with type boolean', (t) => {
  const config = envConfig({ prefix: 'ECONFIG' });
  t.deepEqual(config, {
    mongo: {
      flag: false,
    },
  });
});
