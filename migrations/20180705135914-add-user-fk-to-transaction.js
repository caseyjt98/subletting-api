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
  db.addForeignKey('transaction', 'user', 'user_id_fk',
    {
      'id': 'id'
    },
    {
      onDelete: 'cascade',
      onUpdate: 'RESTRICT'
    }, callback);
};

exports.down = function (db, callback) {
  db.removeForeignKey('transaction', 'user_id_fk')
};

exports._meta = {
  "version": 1
};


exports._meta = {
  "version": 1
};
