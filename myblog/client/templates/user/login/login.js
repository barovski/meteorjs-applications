Template.login.events({
    'submit form': function(event) {
        event.preventDefault();
        var username = $('[name=username]').val();
        var password = $('[name=password]').val();

        Meteor.loginWithPassword({username: username}, password, function(error) {
            if (error) {
                console.log(error.reason);
            } else {
                console.log('user is now logged in');
                Router.go("home");
            }
        });
    }
});
