Template.navbar.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout(function (error){
            if(error){
              console.log("Error Logint Out!");
            }else{
              console.log('user is logged Out');
            }
        });
        Router.go('login');
    }
});
