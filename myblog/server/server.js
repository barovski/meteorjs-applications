import fs from 'fs';
import path from 'path';

Meteor.methods({
    uploadFile: function(file) {
        // file.save('/home/deejay/snapzio/meteor1.2.1-applications/');
            var filepath = '/home/deejay/snapzio/meteor1.2.1-applications/';
            var buffer = new Buffer(file.data);
            var base = path.resolve('.');
            var filepath = path.join(base, '../../../../../.uploadFiles/' + file.name);
            
            console.log(process.env('PWD'));

            fs.writeFileSync(filepath, buffer, 'utf8', (err) => {
                if(err){
                    console.log(err);
                } else {
                    console.log('saved');
                }
            })
    },
    // unused must delete this later
    'saveFile': function(buffer){
        Posts.insert({data:buffer});
    }
});


if(Meteor.isClient){
    // custom binary file reader
    var BinaryFileReaderSave = {
        save: function (dirPath, options){
            var reader = new FileReader;
            var filepath = path.join(dirPath, this.name);
            var buffer = new Buffer(this.data);

            fs.writeFileSync(filepath, buffer, options)


        }
    }
}

// SEEDING
// if(Posts.find().count() === 0){
//     for(var i = 1; i <= 50; i++){
//         Posts.insert({
//             title: 'Test Post #' + i
//         });
//     }
// }
