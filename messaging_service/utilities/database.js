const { MongoClient, ObjectID } = require('mongodb');

const database = "dev"
// const database = "production"

module.exports = {
    connect: function () {
        var username = "khoatxp"
        var password = "GfAxnlFdEOYbDUJ8"
        const uri = `mongodb+srv://${username}:${password}@cluster0.ibt1p.mongodb.net/${database}?retryWrites=true&w=majority`

        // var username = "production"
        // var password = "production"
        // const uri = `mongodb+srv://${username}:${password}@cluster0.bgzbd.mongodb.net/${database}?retryWrites=true&w=majority`

        return new Promise(function (resolve, reject) {
            MongoClient.connect(uri, function (err, client) {
                if (err) {
                    reject(err);
                } else {
                    resolve(client);
                }
            })
        })
    },

    findById: function (collection_name, id) {
        return this.connect().then(function (client) {
            return new Promise(function (resolve, reject) {
                const collection = client.db(database).collection(collection_name)
                collection.findOne({ "_id": new ObjectID(id) }, function (err, post) {
                    if (err) {
                        reject(err);
                    } else {
                        console.log("Retrieved: " + JSON.stringify(post))
                        client.close()
                        resolve(post)
                    }
                })
            })
        })
    },

    findOne: function (collection_name, contents) {
        return this.connect().then(function (client) {
            return new Promise(function (resolve, reject) {
                const collection = client.db(database).collection(collection_name)
                collection.findOne(contents, function (err, post) {
                    if (err) {
                        reject(err);
                    } else {
                        console.log("Retrieved: " + JSON.stringify(post))
                        client.close()
                        resolve(post)
                    }
                })
            })
        })
    },

    insertRecord: function (collection_name, contents) {
        return this.connect().then(function (client) {
            return new Promise(function (resolve, reject) {
                const collection = client.db(database).collection(collection_name)

                collection.insertOne(contents, function (err, res) {
                    if (err) {
                        reject(err)
                    } else {
                        client.close()
                        resolve(res.insertedId)
                    }
                })
            })
        })
    },

    getAll: function (collection_name) {
        return this.connect().then(function (client) {
            return new Promise(function (resolve, reject) {
                const collection = client.db(database).collection(collection_name)
                collection.find({}).sort({ createdAt: -1 }).toArray(function (err, items) {
                    if (err) {
                        reject(err)
                    } else {
                        client.close()
                        console.log("Retrieved: " + JSON.stringify(items))
                        resolve(items)
                    }
                })
            })
        })
    },

    updateWithId: function (collection_name, id, contents) {
        return this.connect().then(function (client) {
            return new Promise(function (resolve, reject) {
                const collection = client.db(database).collection(collection_name)
                collection.updateOne({ "_id": new ObjectID(id) }, contents, function (err, res) {
                    if (err) {
                        reject(err)
                    } else {
                        client.close()
                        resolve(res)
                    }
                })
            })
        })
    },

    updateWithQuery: function (collection_name, query, contents) {
        return this.connect().then(function (client) {
            return new Promise(function (resolve, reject) {
                const collection = client.db(database).collection(collection_name)
                collection.updateMany(query, contents, function (err, res) {
                    if (err) {
                        reject(err)
                    } else {
                        client.close()
                        resolve(res)
                    }
                })
            })
        })
    },

    delete: function (collection_name, id) {
        return this.connect().then(function (client) {
            return new Promise(function (resolve, reject) {
                const collection = client.db(database).collection(collection_name)
                collection.deleteOne({ "_id": new ObjectID(id) }, function (err, res) {
                    if (err) {
                        reject(err)
                    } else {
                        client.close()
                        resolve(res)
                    }
                })
            })
        })
    }
}
