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
  db.createTable('product',
    {
      id: {
        type: 'int',
        unsigned: true,
        primaryKey: true,
        autoIncrement: true
      },
      address_number: {
        type: 'int',
        notNull: true
      },
      street_name: {
        type: 'string',
        length: 255,
        notNull: true
      },
      city: {
        type: 'string',
        length: 255,
        notNull: true
      },
      zip_code: {
        type: 'int',
        notNull: true
      },
      apartment_number: {
        type: 'int'
      },
      description: {
        type: 'string',
        length: 750
      }
      // provider fk DONE

    }, callback);
};



exports.down = function (db, callback) {
  db.dropTable('product', function (err) {
    if (err) return callback(err);
    return callback();
  })
};

exports._meta = {
  "version": 1
};
