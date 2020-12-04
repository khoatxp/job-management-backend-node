const { MongoClient, ObjectID } = require('mongodb');

const database = "dev";

/*var username = "khoatxp" // Look at all the collections in a database
        var password = "GfAxnlFdEOYbDUJ8"
        const uri = `mongodb+srv://${username}:${password}@cluster0.ibt1p.mongodb.net/${database}?retryWrites=true&w=majority`
MongoClient.connect(uri, function(err, db) {
    const production = db.db(database);
    production.listCollections().toArray(function(err,items){
        console.log(items);
    });
});
*/
//const database = "production"
//const database = "dev"
module.exports = {
    connect: function (collection_name) {
        /*var username = "production"
        var password = "production"
        const uri = `mongodb+srv://${username}:${password}@cluster0.bgzbd.mongodb.net/${database}?retryWrites=true&w=majority`
        */
       var username = "khoatxp"
        var password = "GfAxnlFdEOYbDUJ8"
        const uri = `mongodb+srv://${username}:${password}@cluster0.ibt1p.mongodb.net/${database}?retryWrites=true&w=majority`
        

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
                collection.find({}).toArray(function (err, items) {
                    if (err) {
                        reject(err)
                    } else {
                        client.close()
                        //console.log("Retrieved: " + JSON.stringify(items))
                        resolve(items)
                    }
                })
            })
        })
    },

    update: function (collection_name, id, contents) {
        return this.connect().then(function (client) {
            return new Promise(function (resolve, reject) {
                const collection = client.db(database).collection(collection_name)
                collection.update({ "_id": new ObjectID(id) }, contents, function (err, res) {
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
//new ObjectID(id)
    delete: function (collection_name, id) {
        return this.connect().then(function (client) {
            return new Promise(function (resolve, reject) {
                const collection = client.db(database).collection(collection_name)
                collection.deleteOne({ "_id": new ObjectID(id) }, function(err, res) {
                    if(err) {
                        reject(err)
                    } else {
                        client.close()
                        resolve(res)
                    }
                })
            })
        })
    },

    findByIdAndDelete: function (collection_name, id) {
        return this.connect().then(function (client) {
            return new Promise(function (resolve, reject) {
                const collection = client.db(database).collection(collection_name)
                collection.findByIdAndDelete({"_id":new ObjectID(id)}, function(err, res) {
                    if(err) {
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
