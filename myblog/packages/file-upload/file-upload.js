/* ----------------------------------------------------------
 * ----------------- File Upload (client) -------------------
 * ----------------------------------------------------------
 *  - Reads the file and Converts the file to a Uint8Array
 * -------------------------------------------------------- */
export var FileUpload = {
    read: function (file, callback){
        var reader = new FileReader;

        let fileInfo = getFileInfo(file)

        reader.onload = function(){
            fileInfo.data = new Uint8Array(reader.result);
            callback(null, fileInfo);
        };

        reader.onerror = function () {
            callback(reader.error);
        };

        reader.readAsArrayBuffer(file);
    },
    save: function(file, path){

    }
}

function getFileInfo(file){
    return {
        name: file.name,
        type: file.type,
        size: file.size,
        data: null
    }
}
