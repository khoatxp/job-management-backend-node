const axios = require('axios');

module.exports = {
    post_call: function (url, contents) {
        return new Promise(function (resolve, reject) {
            axios({
                method: 'post',
                url: url,
                data: contents
            }).then((response) => {
                resolve()
            }, (err) => {
                reject(err)
            });
        });
    }
}