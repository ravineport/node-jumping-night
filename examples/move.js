"use strict";

var sumo = require('../.');
var cv = require('opencv');

var drone = sumo.createClient();
var video = drone.getVideoStream();
var buf = null;
var w = new cv.NamedWindow("Video", 0);

drone.connect(function() {
  console.log("Connected...");

  drone.postureJumper();
  drone.forward(50);
  setTimeout(function() {
    drone.right(10);
    setTimeout(function() {
      drone.stop();
      drone.longJump();
      drone.animationsSlalom();
    }, 5000);
  }, 1000);
});

drone.on("battery", function(battery) {
  console.log("battery: " + battery);
});

video.on("data", function(data) {
  buf = data;
});

setInterval(function() {
  if (buf == null) {
   return;
  }

  try {
    cv.readImage(buf, function(err, im) {
      if (err) {
        console.log(err);
      } else {
        if (im.width() < 1 || im.height() < 1) {
          console.log("no width or height");
          return;
        }
        w.show(im);
        w.blockingWaitKey(0, 50);
      }
    });
  } catch(e) {
    console.log(e);
  }
}, 100);
