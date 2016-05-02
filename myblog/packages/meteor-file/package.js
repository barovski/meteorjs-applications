Package.describe({
    summary: 'Simple file uploading for Meteor'
});

Package.onUse(function (api){
    api.use(['ejson'], ['client', 'server']);
    api.add_files(['meteor-file.js'], ['client', 'server']);
})
