Template.upload.events({
    'submit form': function(e, template) {
        e.preventDefault();

        var fileInput = template.find('input[type=file]');

        var form = e.currentTarget;

        var reader = new FileReader();

        var file;

        for(var i = 0; i < fileInput.files.length; i++){
            file =fileInput.files[i];


            reader.readAsBinaryString(fileInput.files[0]);
            // console.log(file);
            console.log(reader.result);

        }
    },
});
