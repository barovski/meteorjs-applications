Template.postsList.helpers({
    postsList: function() {
        return Posts.find();
    },
    dataType: function(data) {
        console.dir(data);
        return EJSON.parse(data);
    },
});
