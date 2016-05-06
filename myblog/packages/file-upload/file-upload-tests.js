// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by file-upload.js.
import { name as packageName } from "meteor/file-upload";

// Write your tests here!
// Here is an example.
Tinytest.add('file-upload - example', function (test) {
  test.equal(packageName, "file-upload");
});
