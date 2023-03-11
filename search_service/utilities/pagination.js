module.exports = {
    build_response: function (array, paginated, page, limit, query = null) {
        var start = (page - 1) * limit;
        var end = start + limit;

        const metadata = this.create_metadata(array, paginated, page, limit, query);
        return {
            "_metadata": metadata,
            "records": paginated
        };
    },

    create_metadata: function (array, paginated, page, limit, query) {
        const max_pages = Math.ceil(array.length / limit);
        const links = this.create_links(page, limit, max_pages, query);

        return {
            "page": page,
            "per_page": limit,
            "page_count": paginated.length,
            "total_pages": max_pages,
            "total_count": array.length,
            "links": links,
        };
    },

    create_links: function (page, limit, max_pages, query) {
        const links = [];

        links.push({"self": `/jobPosting?queryLimit=${limit}&page=${page}` + ((query == null) ? "" : `&query=${query}`)})
        links.push({"first": `/jobPosting?queryLimit=${limit}&page=1` + ((query == null) ? "" : `&query=${query}`)})
        links.push({"last": `/jobPosting?queryLimit=${limit}&page=${max_pages}` + ((query == null) ? "" : `&query=${query}`)})

        if (page > 1) {
            const previous_page = page - 1;
            links.push({"previous": `/jobPosting?queryLimit=${limit}&page=${previous_page}` + ((query == null) ? "" : `&query=${query}`)})
        }

        if (page < max_pages) {
            const next_page = page + 1;
            links.push({"next": `/jobPosting?queryLimit=${limit}&page=${next_page}` + ((query == null) ? "" : `&query=${query}`)})
        }

        return links;
    }
}