import { FileUpload } from 'meteor/deejay:file-upload';

Meteor.methods({
    uploadFile: function(title, body, file) {
        // add image
        var imageId = Images.insert({
            name: file.name,
            type: file.type,
            size: file.size,
            createdAt: new Date()
        });

        // save filesytem
        FileUpload.save(file, imageId, function(message){
            console.log(message);
        });

        // add post
        Posts.insert({
            imageId: imageId,
            title: title,
            body: body,
            createdAt: new Date()
        });
    },
    userRegister: function(username, password){
            
        Accounts.createUser({
            username: username,
            password: password
        });
    }
});
