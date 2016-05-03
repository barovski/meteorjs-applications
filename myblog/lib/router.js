Router.configure({
    layoutTemplate: 'layout',
    // loadingTemplate: 'loading',
    notFoundTemplate: 'notFound'
});

Router.route('/', {
    name: 'home',
    template: 'home',
});

Router.route('/upload', {
    name: 'upload',
    template: 'upload',
});

Router.route('/search', {
    name: 'search',
    template: 'search',
});

/* ----------------------------------------------------------
 * PostListController for Pagination
 * -------------------------------------------------------- */
PostListController = RouteController.extend({
    template: 'posts',
    increment: 1,
    postsLimit: function() {
        return parseInt(this.params.postLimit) || this.increment;
    },
    findOptions: function() {
        return { limit: this.postsLimit() };
    },
    waitOn: function() {
        return Meteor.subscribe('getPostsWithImages', this.postsLimit());
    },
    posts: function() {
        return Posts.find( {}, this.findOptions() );
    },
    data: function() {
        var hasMore = this.posts().count() === this.postsLimit();
        var nextPath = this.route.path({postLimit: this.postsLimit() + this.increment});
        
        return {
            postList: this.posts(),
            nextPath: hasMore ? nextPath : null,
        }
    },

});

Router.route('/posts/:postLimit?', {
    name: 'posts',
    controller: PostListController,
});

Router.route('/postsList', {
    name: 'postsList',
    template: 'postsList',
    waitOn: function(){
        return Meteor.subscribe('getPostsWithImages', 1);
    }
});
