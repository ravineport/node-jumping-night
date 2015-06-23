"use strict";

var Sumo = require("./sumo");

module.exports.constants = require("./constants");

module.exports.createClient = function(opts) {
  return new Sumo(opts);
};
