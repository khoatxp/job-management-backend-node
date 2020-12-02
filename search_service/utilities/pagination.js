module.exports = {
    build_response: function (array, paginated, page, limit, query = null) {
        var start = (page - 1) * limit
        var end = start + limit

        const metadata = this.create_metadata(array, paginated, page, limit, query)
        const results = {
            "_metadata": metadata,
            "records": paginated
        }

        return results
    },

    create_metadata: function(array, paginated, page, limit, query) {
        var max_pages = Math.ceil(array.length / limit)
        var links = this.create_links(page, limit, max_pages, query)

        var metadata = {
            "page": page,
            "per_page": limit,
            "page_count": paginated.length,
            "total_pages": max_pages,
            "total_count": array.length,
            "links" : links,
        }

        return metadata
    },

    create_links: function(page, limit, max_pages, query) {
        var links = []

        links.push({"self": `/jobPosting?queryLimit=${limit}&page=${page}` + ((query == null) ? "" : `&query=${query}`)})
        links.push({"first": `/jobPosting?queryLimit=${limit}&page=1` + ((query == null) ? "" : `&query=${query}`)})
        links.push({"last": `/jobPosting?queryLimit=${limit}&page=${max_pages}` + ((query == null) ? "" : `&query=${query}`)})

        if(page > 1) {
            var previous_page = page - 1
            links.push({"previous": `/jobPosting?queryLimit=${limit}&page=${previous_page}` + ((query == null) ? "" : `&query=${query}`)})
        }

        if(page < max_pages) {
            var next_page = page + 1
            links.push({"next": `/jobPosting?queryLimit=${limit}&page=${next_page}` + ((query == null) ? "" : `&query=${query}`)})
        }

        return links
    }
}

// var data = posts.slice(start, end)
// var max_pages = Math.ceil(posts.length/query_limit)

// var links = []
// links.push({"self": `/jobPosting?queryLimit=${query_limit}&page=${page}`})
// links.push({"first": `/jobPosting?queryLimit=${query_limit}&page=1`})
// links.push({"last": `/jobPosting?queryLimit=${query_limit}&page=${max_pages}`})

// if(page != 1) {
//     var previous_page = page - 1
//     links.push({"previous": `/jobPosting?queryLimit=${query_limit}&page=${previous_page}`})
// }

// if(page != max_pages) {
//     var next_page = page + 1
//     links.push({"next": `/jobPosting?queryLimit=${query_limit}&page=${next_page}`})
// }

// const results = {
//     "_metadata" : {
//         "page": page,
//         "per_page": query_limit,
//         "page_count": data.length,
//         "total_pages": max_pages,
//         "total_count": posts.length,
//         "links" : links,
//     }
// }


// {
//     "_metadata": 
//     {
//         "page": 5,
//         "per_page": 20,
//         "page_count": 20,
//         "total_count": 521,
//         "Links": [
//             {"self": "/products?page=5&per_page=20"},
//             {"first": "/products?page=0&per_page=20"},
//             {"previous": "/products?page=4&per_page=20"},
//             {"next": "/products?page=6&per_page=20"},
//             {"last": "/products?page=26&per_page=20"},
//         ]
//     },
//     "records": [
//         {}
//     ]
// }