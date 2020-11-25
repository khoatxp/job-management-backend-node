const FlexSearch = require("flexsearch")

var map = new Map()
var index = new FlexSearch("match")

module.exports = {
    add_index: function(posting) {
        index.add(posting._id, posting.company + " " + posting.name + " " + posting.description)
        map.set(posting._id, posting)
    },

    get_index: function(query, query_limit) {
        var index_results = index.search(query, query_limit)

        // TODO: ONLY RETURN THE ID'S AND SAVE ONLY THE ID'S THE JOB POSTINGS SERVICE WILL RETURN THE DATA
        var results = []
        for (var i = 0; i < index_results.length; i++) {
            results.push(map.get(index_results[i]))
        }

        return results
    },

    update_index: function(id, new_posting) {
        var posting = map.get(id)
        Object.keys(new_posting).forEach(function (key) {
            posting[key] = new_posting[key]
        });

        index.add(id, posting.company + " " + posting.name + " " + posting.description)
        map.set(id, posting)    
    },

    delete_index: function(id) {
        index.remove(id)
        map.delete(id)
    },

    contains_id: function(id) {
        return map.has(id)
    }
}