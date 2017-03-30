const { test } = require('ava');
const envConfig = require('../');

const ENV = {
  CONFIG_mongo_db: 'mongo.db',
};

test.before(() => {
  Object.assign(process.env, ENV);
});

test('should load mongo db', (t) => {
  const config = envConfig();
  t.is(config.mongo.db, 'mongo.db');
});
