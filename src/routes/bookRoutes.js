const { getBooksHandler, getBookHandler, postBookHandler, editBookHandler, deleteBookHandler } = require("../handlers/bookHandlers")

const bookRoutes = [
    {
        method: "GET",
        path: "/books",
        handler: (req, h) => getBooksHandler(req, h)
    },
    {
        method: "GET",
        path: "/books/{bookId}",
        handler: (req, h) => getBookHandler(req, h)
    },
    {
        method: "POST",
        path: "/books",
        handler: (req, h) => postBookHandler(req, h)
    },
    {
        method: "PUT",
        path: "/books/{bookId}",
        handler: (req, h) => editBookHandler(req, h)
    },
    {
        method: "DELETE",
        path: "/books/{bookId}",
        handler: (req, h) => deleteBookHandler(req, h)
    }
]

module.exports = bookRoutes