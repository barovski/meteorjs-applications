
Meteor.publish('Posts.Paginate', function(options) {
    return Posts.find({}, options);
});

Meteor.publishComposite('getPostsWithImages', function(limit) {
    return {
        find: function() {
            // Find top ten highest scoring posts
            return Posts.find({}, { sort: { createdAt: -1 }, limit: limit });
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
    }
});
