"use strict";

var sumo = require('../.');

var drone = sumo.createClient();

drone.connect(function() {
  console.log("Connected...");
});

drone.on("battery", function(battery) {
  console.log("battery: " + battery);
});
