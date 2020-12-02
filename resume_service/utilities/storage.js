const { Storage } = require('@google-cloud/storage');

var PROJECT_ID = "cmpt-470-project-production"
var BUCKET = "cmpt470-resumes"

module.exports = {
    upload_file: function (path, cloudStoragePath) {
        return new Promise(function (resolve, reject) {
            const gcs = new Storage({
                projectId: PROJECT_ID
            })
            const bucket = gcs.bucket(BUCKET)
            bucket.upload(path, { destination: cloudStoragePath }, function (err, file) {
                if(err) {
                    reject(err)
                } else {
                    resolve(file)
                }
            })
        });
    },

    get_files: function(userId) {
        return new Promise(function (resolve, reject) {
            const gcs = new Storage({
                projectId: PROJECT_ID
            })
            const bucket = gcs.bucket(BUCKET)
            bucket.getFiles({ prefix: userId }, function (err, files) {
                if(err) {
                    reject(err)
                } else {
                    resolve(files)
                }
            })
        })
    }
}