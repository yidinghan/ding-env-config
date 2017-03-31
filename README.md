# env-config

[![Travis](https://img.shields.io/travis/yidinghan/ding-env-config.svg?style=flat-square)]()
[![Coveralls](https://img.shields.io/coveralls/yidinghan/ding-env-config.svg?style=flat-square)]()
[![npm](https://img.shields.io/npm/dm/ding-env-config.svg?style=flat-square)]()
[![npm](https://img.shields.io/npm/v/ding-env-config.svg?style=flat-square)]()
[![npm](https://img.shields.io/npm/l/ding-env-config.svg?style=flat-square)]()

read configuration form environment by specified format

# Getting Start

## NPM

install

```shell
npm i -S ding-env-config
```

## Usage

```js
// export CONFIG_mongo_db=db1
const envConfig = require('ding-env-config');
const config = envConfig();
// {
//   "mongo": {
//     "db": "db1"
//   }
// }
```

<a name="envConfig"></a>

## envConfig([payload]) ⇒ <code>object</code>
once there are somethings like `CONFIG_mongo_db` in env,
the codes below will set `config.mongo.db` to the env val

**Kind**: global function
**Returns**: <code>object</code> - parse out config

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [payload] | <code>object</code> |  | input arguments |
| [payload.config] | <code>object</code> | <code>{}</code> | default config object |
| [payload.separator] | <code>string</code> | <code>&quot;_&quot;</code> | symbol between key path and prefix |
| [payload.prefix] | <code>string</code> | <code>&quot;CONFIG&quot;</code> | prefix to match target environment |

**Example**
```js
// export CONFIG_mongo_db=db1
const config = envConfig();
// {
//   "mongo": {
//     "db": "db1"
//   }
// }

// export CONFIG_mongo_port__num=27017
const config = envConfig();
// {
//   "mongo": {
//     "port": 27017
//   }
// }

// export CONFIG_mongo_flag=true
const config = envConfig();
// {
//   "mongo": {
//     "flag": "true"
//   }
// }

// export CONFIG_mongo_flag__bool=true
const config = envConfig();
// {
//   "mongo": {
//     "flag": true
//   }
// }
```
