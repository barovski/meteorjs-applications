Posts = new Mongo.Collection('posts');

Posts.allow({
    update: function(userId, post) {
        return ownsDocument(userId, post);
    },
    remove: function(userId, post) {
        return ownsDocument(userId, post);
    },
});

Posts.deny({
    update: function(userId, post, fieldNames) {
        // validate update post on server
        var errors = validatePost(modifier.$set);
        return errors.title || errors.url;

        // return a sub-array containing the fields that are not url or title
        // If everything’s normal, that array should be empty and its length should be 0. If someone is trying
        // anything funky, that array’s length will be 1 or more, and the callback will return true (thus denying the update).
        return (_.without(fieldNames, 'url', 'title').length > 0);
    },
});

Meteor.methods({
    postInsert: function(postAttributes) {

        check(Meteor.userId(), String);
        check(postAttributes, {
            title: String,
            url: String
        });

        // for checking latency compensation we are sleeping the server 5secondsj
        // if (Meteor.isServer) {
        //     postAttributes.title += "(server)";
        //     // wait for 5 seconds
        //     Meteor._sleepForMs(5000);
        // } else {
        //     postAttributes.title += "(client)";
        // }

        // Server Side validation
        // try this meteor call on the browser console:
        // Meteor.call('postInsert', {url: '', title: 'No URL here!'});
        var errors = validatePost(postAttributes);
        if (errors.title || errors.url){
            throw new Meteor.Error('invalid-post', "You must set a title and URL for your post ");
        }

        // Preventing Duplicates
        // And since we’re triggering a return call, the method stops at that
        // point without executing the insert statement, thus elegantly preventing any duplicates.
        var postWithSameLink = Posts.findOne({url: postAttributes.url});
        if (postWithSameLink) {
            return {
                postExists: true,
                _id: postWithSameLink._id
            }
        }

        var user = Meteor.user();
        var post = _.extend(postAttributes, {
            userId: user._id,
            author: user.username,
            submitted: new Date(),
            commentsCount: 0
        });

        var postId = Posts.insert(post);

        return {
            _id: postId
        };
    },
    upvote: function(postId) {
        check(this.userId, String);
        check(postId, String);

        // var post = Posts.findOne(postId);
        // if (!post)
        //     throw new Meteor.Error('invalid', 'Post not found');
        //
        // if (_.include(post.upvoters, this.userId))
        //     throw new Meteor.Error('invalid', 'Already upvoted this post');

        // Posts.update(post._id, {
        //     $addToSet: {upvoters: this.userId},
        //     $inc: {votes: 1}
        // });

        var affected = Posts.update(
            {
                _id: postId,
                upvoters: {$ne: this.userId}
            },
            {
                $addToSet: {upvoters: this.userId},
                $inc: {votes: 1}
            }
        );
        if (! affected)
            throw new Meteor.Error('invalid', "You weren't able to upvote that post");
    },
});

validatePost = function(post) {
    var errors = {};
    if (!post.title)
        errors.title = "Please fill in a headline";
    if (!post.url)
        errors.url =
        "Please fill in a URL";
    return errors;
}
