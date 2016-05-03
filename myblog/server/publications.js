
Meteor.publish('Posts.Paginate', function(options) {
    return Posts.find({}, options);
});

Meteor.publishComposite('getPostsWithImages', {
    find: function() {
        // Find top ten highest scoring posts
        return Posts.find({}, { sort: { createdAt: -1 }, limit: 10 });
    },
    children: [
        {
            find: function(post) {
                return Images.find(
                    { _id: post.imageId },
                    { limit: 1, fields: { name: 1 } }
                );
            }
        },
    ]
});
