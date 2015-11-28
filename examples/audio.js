"use strict";

var sumo = require('../.');
var cv = require('opencv');
var Speaker = require('speaker');
var Readable = require('stream').Readable;

var drone = sumo.createClient();
var buf = null;
var audio;
var sound = new Readable();
sound.bitDepth = 16;
sound.channels = 2;
sound.sampleRate = 44100;
//sound.samplesGenerated = 0;
sound._read = read;
sound.pipe(new Speaker());
var speaker = new Speaker();

drone.connect(function() {
  console.log("Connected...");

  // drone.postureJumper();
  // drone.forward(50);
  // setTimeout(function() {
  //   drone.right(10);
  //   setTimeout(function() {
  //     drone.stop();
  //     drone.animationsLongJump();
  //     drone.animationsSlalom();
  //   }, 5000);
  // }, 1000);

  audio = drone.getAudioStream();
  audio.pipe(new Speaker());
  audio.on("data", function(data) {
    buf = data;
    //speaker.write(buf);
  });

});

drone.on("battery", function(battery) {
  console.log("battery: " + battery);
});

function read (n) {
  console.log("ok");
  if(buf != null){
    this.push(buf);
    buf = null;
  }
}
