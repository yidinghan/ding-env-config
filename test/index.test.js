const { test } = require('ava');
const envConfig = require('../');

const ENV = {
  CONFIG_mongo_db: 'mongo.db1',
  CONFIG__mongo__db: 'mongo.db2',
};

test.before(() => {
  Object.assign(process.env, ENV);
});

test('should load mongo db', (t) => {
  const config = envConfig();
  t.is(config.mongo.db, 'mongo.db1');
  t.is(Object.keys(config).length, 1);
});

test('should load mongo db with another separator', (t) => {
  const config = envConfig({ separator: '__' });
  t.is(config.mongo.db, 'mongo.db2');
  t.is(Object.keys(config).length, 1);
});
