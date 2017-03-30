const { test } = require('ava');
const envConfig = require('../');

const ENV = {
  CONFIG_mongo_db: 'mongo.db1',
  CONFIG__mongo__db: 'mongo.db2',
  ACONFIG_mongo_db: 'mongo.db3',
};

test.before(() => {
  Object.assign(process.env, ENV);
});

test('should load mongo db', (t) => {
  const config = envConfig();
  t.is(Object.keys(config).length, 1);
  t.is(config.mongo.db, 'mongo.db1');
});

test('should load mongo db with another separator', (t) => {
  const config = envConfig({ separator: '__' });
  t.is(Object.keys(config).length, 1);
  t.is(config.mongo.db, 'mongo.db2');
});

test('should load mongo db with another prefix', (t) => {
  const config = envConfig({ prefix: 'ACONFIG' });
  t.is(Object.keys(config).length, 1);
  t.is(config.mongo.db, 'mongo.db3');
});

test('should load mongo db with pre define config', (t) => {
  const config = envConfig({ config: { foo: 'bar' } });
  t.is(Object.keys(config).length, 2);
  t.is(config.mongo.db, 'mongo.db1');
  t.is(config.foo, 'bar');
});
