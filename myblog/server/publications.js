
Meteor.publish('Posts.Paginate', function(options) {
    return Posts.find({}, options);
});
