'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

// callback param
exports.up = function (db, callback) {
  db.createTable('user',
    {
      id: {
        type: 'int',
        unsigned: true,
        primaryKey: true,
        autoIncrement: true
      },

      first_name: {
        type: 'string',
        length: 255,
        notNull: true
      },

      last_name: {
        type: 'string',
        length: 255,
        notNull: true
      },

      email: {
        type: 'string',
        length: 255,
        notNull: true
      },
      password: {
        type: 'string',
        length: 255,
        notNull: true
      },
      age: {
        type: 'int',
        notNull: true
      }

    }, callback);
};

exports.down = function (db, callback) {
  db.dropTable('user', function (err) {
    if (err) return callback(err);
    return callback();
  })
};

exports._meta = {
  "version": 1
};
