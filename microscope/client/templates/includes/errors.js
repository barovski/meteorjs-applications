Template.errors.helpers({
    errors: function() {
        return Errors.find();
    }
});

Template.error.onRendered(function() {
    var error = this.data;
    // remove error so that it won't get stacked
    Meteor.setTimeout(function() {
        Errors.remove(error._id);
    }, 3000);
});
