"use strict"

var path = require("path");
var fs = require("fs");

var list = function (callback) {
	fs.readdir(path.join(__dirname, "/cows"), function (err, files) {
		if (err) return callback(err);

		var cows = files.map(function (cow) {
			return path.basename(cow, ".cow");
		});

		return callback(null, cows);
	});
}

let cowDefinitions = {}

console.log("DIR|"  + __dirname)
list(function(e, cows) {

  // Debug array of cows
  console.log(cows)

  // Process each cow
  cows.forEach(function(cow) {
    console.log("cow: " + cow)

    let filePath = path.join(__dirname, "/cows", cow) + ".cow";
    let text = fs.readFileSync(filePath, "utf-8");
    console.log(text)

    // Add to our json
    cowDefinitions[cow] = text

  })

  // Output our resulting json
  let json = JSON.stringify(cowDefinitions, null, 2)
  //console.log(json)
  fs.writeFileSync("cow-definitions.json", json, 'utf8')

  let code = "// Generated code\nexports.cowdefs = " + json;

  fs.writeFileSync("lib/cow-definitions.js", code, 'utf8')

})
