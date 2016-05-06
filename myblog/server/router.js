import { FileUpload } from 'meteor/deejay:file-upload';

/* ----------------------------------------------------------
 * serve images from the server
 *  note: currently has a bug. when the user uploads the image
 *        since it takes time to autoOrient an image the image
          is not rendered on the post page
 * -------------------------------------------------------- */
Router.route("/upload/:imageName", function(){

    var fileName = this.params.imageName,
        query = this.request.query;

    var file = FileUpload.getImage(fileName);

    this.response.statusCode = 200;
    this.response.end(file);

}, {where: "server"});
 
