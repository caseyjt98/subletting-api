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

exports.up = function (db, callback) {
  db.createTable('menu', {
    id: {
      type: 'int',
      unsigned: true,
      primaryKey: true,
      autoIncrement: true
    },
    date_to: {
      type: 'date',
      notNull: true

    },
    date_from: {
      type: 'date',
      notNull: true

    },
    price: {
      type: 'int',
      notNull: true
    }
    // product fk DONE

  }, callback);
};



exports.down = function (db, callback) {
  db.dropTable('menu', function (err) {
    if (err) return callback(err);
    return callback();
  })
};

exports._meta = {
  "version": 1
};
