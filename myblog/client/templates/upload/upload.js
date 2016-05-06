/* ----------------------------------------------------------
 * Uploading File Event
 * -------------------------------------------------------- */

import { FileUpload } from 'meteor/deejay:file-upload';


Template.upload.events({
    'submit form': function(e, template) {
        e.preventDefault();

        var fileInput = template.find('input[type=file]');
        var fileList = fileInput.files;

        var title = e.target.title.value;
        var body = e.target.body.value;


        for(var i = 0; i < fileList.length; i++){

            FileUpload.read(fileList[i], function(err, meteorFile){
                if(err){
                    console.log(err);
                }else{
                    Meteor.call('uploadFile', title, body, meteorFile);
                }
            });
        }
        Router.go('/uploadSuccess');
    },
});
