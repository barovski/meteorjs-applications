/* ----------------------------------------------------------
 * Hooks and Configuration
 * -------------------------------------------------------- */
Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function(){
        return [
            Meteor.subscribe('notifications')
        ];
    }
});

var requireLogin = function(){
    if(! Meteor.user()){
        this.render('accessDenied');
    } else {
        this.next();
    }
}

Router.onBeforeAction(requireLogin, {
    only: ['postSubmit']
});
Router.onBeforeAction('dataNotFound', {
    // shows notfoundpage if postPage whenever data function returns falsy values
    only: ['postPage']
});

/* ----------------------------------------------------------
 * Contorllers
 * -------------------------------------------------------- */
PostsListController = RouteController.extend({
    template: 'postsList',
    increment: 5,
    postsLimit: function() {
        return parseInt(this.params.postsLimit) || this.increment;
    },
    findOptions: function() {
        // return {sort: {submitted: -1}, limit: this.postsLimit()};
        return {sort: this.sort, limit: this.postsLimit()};
    },
    subscriptions: function() {
        this.postsSub = Meteor.subscribe('posts', this.findOptions());
    },
    posts: function() {
        return Posts.find({}, this.findOptions());
    },
    data: function() {
        var hasMore = this.posts().count() === this.postsLimit();
        var nextPath = this.route.path({postsLimit: this.postsLimit() + this.increment});
        return {
            posts: this.posts(),
            ready: this.postsSub.ready, // extended
            nextPath: hasMore ? nextPath : null
        };
    }
});

NewPostsController = PostsListController.extend({
    sort: {submitted: -1, _id: -1},
    nextPath: function() {
        return Router.routes.newPosts.path({postsLimit: this.postsLimit() + this.increment})
}});

BestPostsController = PostsListController.extend({
    sort: {votes: -1, submitted: -1, _id: -1},
    nextPath: function() {
        var bestpost = Router.routes.bestPosts.path({postsLimit: this.postsLimit() + this.increment})
        console.log(bestpost);
        return bestpost;
    }
});

Router.route('/', {
    name: 'home',
    controller: BestPostsController
});

Router.route('/new/:postsLimit?', {name: 'newPosts'});

Router.route('/best/:postsLimit?', {name: 'bestPosts'});

/* ----------------------------------------------------------
 * Routes
 * -------------------------------------------------------- */

Router.route('/posts/:_id', {
    name: 'postPage',
    template: 'postPage',
    waitOn: function(){
        return [
            Meteor.subscribe('singlePost', this.params._id),
            Meteor.subscribe('commentsAll'),
            // returns only the comment of the user
            // Meteor.subscribe('comments', this.params._id)
        ];

    },
    data: function() {
        return Posts.findOne(this.params._id);
    },
});

Router.route('/posts/:_id/edit', {
    name: 'postEdit',
    template: 'postEdit',
    waitOn: function(){
        return Meteor.subscribe('singlePost', this.params._id);
    },
    data: function() {
        return Posts.findOne(this.params._id);
    },
});

Router.route('/submit', {
    name: 'postSubmit',
    template: 'postSubmit',
});

// should be put at the bottom
Router.route('/:postsLimit?', {
    name: 'postsList',
    // template: 'postsList',
});
