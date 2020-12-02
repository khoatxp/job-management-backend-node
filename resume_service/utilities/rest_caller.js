const axios = require('axios');

module.exports = {
    post_call: function (url, contents, headers) {
        return new Promise(function (resolve, reject) {
            axios({
                method: 'post',
                url: url,
                data: contents
            }).then((response) => {
                resolve(response.data)
            }, (err) => {
                reject(err)
            });
        });
    }
}