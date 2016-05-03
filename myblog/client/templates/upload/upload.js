/* ----------------------------------------------------------
 * Uploading File Event
 * -------------------------------------------------------- */
Template.upload.events({
    'submit form': function(e, template) {
        e.preventDefault();

        var fileInput = template.find('input[type=file]');
        var fileList = fileInput.files;

        var title = e.target.title.value;
        var body = e.target.body.value;


        for(var i = 0; i < fileList.length; i++){

            BinaryFileReader.read(fileList[i], function(err, meteorFile){
                if(err){
                    console.log(err);
                }else{
                    Meteor.call('uploadFile', title, body, meteorFile);
                }
            });
        }

        Router.go('/posts');
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
                fileInfo.data = new Uint8Array(reader.result);
                // fileInfo.data = reader.result;
                callback(null, fileInfo);
            };

            reader.onerror = function () {
                callback(reader.error);
            };

            reader.readAsArrayBuffer(file);
        }
    }
}
