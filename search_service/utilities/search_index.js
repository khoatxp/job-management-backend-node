const FlexSearch = require("flexsearch")

module.exports = {
    get_index: function (index, query) {
        var index_results = index.search(query)
        return index_results
    },

    build_index: function (postings) {
        var index = new FlexSearch("match")
        this.add_index(index, postings)

        return index
    },

    /** HELPER FUNCTIONS */
    add_index: function (index, postings) {
        postings.forEach(posting => {
            index.add(posting._id, posting.title + " " + posting.company + " " + posting.location)
        })
    }
}