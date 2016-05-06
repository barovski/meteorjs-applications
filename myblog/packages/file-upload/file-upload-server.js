/* ----------------------------------------------------------
 * ----------------- File Upload (server) -------------------
 * ----------------------------------------------------------
 *  - export var FileUpload
 *  - using fs, path and gm packages
 * -------------------------------------------------------- */
import fs from 'fs';
import path from 'path';
var gm = require('gm').subClass({imageMagick: true}); // autoOrient image
var base = path.resolve('.'); // get current path


export var FileUpload = {
    // save filesystem and autoOrient by reading EXIF using gm
    saveAutoOrient: function(file, fileName, callback){

        // buffer - converts the Uint8Array type to a buffer type
        var buffer = new Buffer(file.data);
        var filepath = getFilePath(fileName);

        gm(buffer).autoOrient().write(filepath, function(err) {
            if (err){
                callback(err);
            } else {
                callback('File Upload Success');
            }
        });
    },
    // save filesystem
    save: function(file, fileName, callback){

        // buffer - converts the Uint8Array type to a buffer type
        var buffer = new Buffer(file.data);
        var filepath = getFilePath(fileName);

        fs.writeFileSync(filepath, buffer, 'utf8', function(err){
            if(err){
                callback(err);
            }else{
                callback('File UPload Success');
            }
        })
    },
    // get the path of the image
    getImage: function(fileName) {
        var imagePath = getFilePath(fileName);

        return fs.readFileSync(imagePath);
    },
}

// return <project-name>/.uploadFiles/:filename
// using .uploadFiles so that Meteor won't read folder for changes
// and reload the page
function getFilePath(fileName){
    return path.join(base, '../../../../../.uploadFiles/' + fileName);
}
