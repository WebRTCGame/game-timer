console.log("...building...");

var fs = require("fs");
var browserify = require("browserify");
var babelify = require("babelify");

browserify({
        debug: true
    })
    .transform(babelify.configure({
        stage: 0
    }))
    .require("./script.js", {
        entry: true
    })
    .bundle()
    .on("error", function(err) {
        console.log("Error: " + err.message);
    })
    .pipe(fs.createWriteStream("bundle.js"));

console.log("...done building...");