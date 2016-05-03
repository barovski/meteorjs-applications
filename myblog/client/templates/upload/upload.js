/* ----------------------------------------------------------
 * Uploading File Manually
 * -------------------------------------------------------- */
Template.upload.events({
    'submit form': function(e, template) {
        e.preventDefault();

        var fileInput = template.find('input[type=file]');
        var fileList = fileInput.files;
        var reader = new FileReader;

        // console.log(fileInput); // element from the html
        // console.log(fileList); // List of Files from the element

        // loop through the fileList
        for(var i = 0; i < fileList.length; i++){

            // console.log(fileList[i]); // The Specific File on the File List

            BinaryFileReader.read(fileList[i], function(err, meteorFile){
                if(err){
                    console.log(err);
                }else{
                    console.log(meteorFile)
                    Meteor.call('uploadFile', meteorFile);
                }
            });
        }

    },
    // probably wont be used
    'submit form1': function(e, template) {
        e.preventDefault();
        var fileInput = template.find('input[type=file]');
        var file = fileInput.files[0]; //assuming 1 file only
        if (!file) return;

        var reader = new FileReader(); //create a reader according to HTML5 File API

        reader.onload = function(event){
            var json = EJSON.stringify(reader.result);
            // console.log(json);
            var buffer = new Uint8Array(reader.result) // convert to binary
            console.log(typeof buffer);
            // Meteor.call('saveFile', buffer);
        }

        reader.readAsArrayBuffer(file); //read the file as arraybuffer
    },
});


/* ----------------------------------------------------------
 * Should be made as a Package Later
 * -------------------------------------------------------- */
if(Meteor.isClient){
    // custom binary file reader
    var BinaryFileReader = {
        read: function (file, callback){
            var reader = new FileReader;

            var fileInfo = {
                name: file.name,
                type: file.type,
                size: file.size,
                data: null
            };

            reader.onload = function(){
                console.log('file loaded');
                fileInfo.data = new Uint8Array(reader.result);
                callback(null, fileInfo);
            };

            reader.onerror = function () {
                callback(reader.error);
            };

            reader.readAsArrayBuffer(file);
        }
    }
}
