var fs = require('fs')

module.exports = {
    get_extension: function (fileName) {
        var ext =  fileName.split('.').pop();
        return "." + ext
    },

    rename: function (orgPath, renamePath) {
        return new Promise(function (resolve, reject) {
            fs.rename(orgPath, renamePath, function (err) {
                if (err) {
                    reject(err)
                } else {
                    resolve(renamePath)
                }
            })
        })
    },

    base64: function (path) {
        return fs.readFileSync(path, {encoding: 'base64'})
    }
}