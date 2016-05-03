import fs from 'fs';
import path from 'path';


Router.route("/upload/:imageName", function(){

    var fileName = this.params.imageName,
        query = this.request.query;

    var base = path.resolve('.');
    var imagePath = path.join(base, '../../../../../.uploadFiles/' + fileName);

    var file = fs.readFileSync(imagePath);

    this.response.statusCode = 200;
    this.response.end( file );

}, {where: "server"});
