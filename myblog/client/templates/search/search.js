Template.search.events({
    'submit form': function(e,tmpl) {
        e.preventDefault();

        var search = e.target.search.value;

        console.log(search);
        Posts.find({title: search})

        $('.search-form').trigger("reset");
        // template.find("form").reset();
    },
});
