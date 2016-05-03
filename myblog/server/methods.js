import fs from 'fs';
import path from 'path';

Meteor.methods({
    uploadFile: function(title, body, file) {
        var buffer = new Buffer(file.data);
        var base = path.resolve('.');
        var filepath = path.join(base, '../../../../../.uploadFiles/' + file.name);

        fs.writeFileSync(filepath, buffer, 'utf8', (err) => {
            if(err){
                console.log(err);
            }
        });

        var imageId = Images.insert({
            name: file.name,
            type: file.type,
            size: file.size,
            createdAt: new Date()
        });

        Posts.insert({
            imageId: imageId,
            title: title,
            body: body,
            createdAt: new Date()
        });
    },
});
