Meteor.methods({
    uploadFile: function(file) {
        // file.save('/Users/deejay/tmp/uploads');
        console.log(file);
    },
});

if(Posts.find().count() === 0){
    for(var i = 1; i <= 50; i++){
        Posts.insert({
            title: 'Test Post #' + i
        });
    }
}
