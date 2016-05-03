Template.posts.helpers({
    listsPost: function() {
        return Posts.find({}, {sort: {createdAt: -1}});
    },
    getAbs: function() {
        return Meteor.absoluteUrl();
    },
    getFile: function(imageId) {
        return Images.findOne({_id: imageId}).name;
    },
});
