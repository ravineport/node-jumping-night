"use strict";

module.exports = function(grunt) {
  grunt.initConfig({
    eslint: { target: ["Gruntfile.js", "lib", "examples"] },
    }
  );

  grunt.loadNpmTasks("grunt-eslint");

  grunt.registerTask("default", ["eslint"]);
  grunt.registerTask("lint", ["eslint"]);
};
