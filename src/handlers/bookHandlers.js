const { readBooks, readBook, addBook, editBook, deleteBook } = require("../utils/utils")
const { nanoid } = require("nanoid")

const getBooksHandler = (request, h) => {
    let queries = {}
    // Destructure query request
    const { name, reading, finished } = request.query
    // Kemudian simpan ke dalam object queries jika ada
    if(name) queries.name = name
    if(reading) queries.reading = +reading === 0 ? false : true
    if(finished) queries.finished = +finished === 0 ? false : true
    // Mengambil data buku dari books.json
    const booksData = readBooks()
    // Melakukan inisiasi variabel filteredBooksData, yang sifatnya redeclare apabila ada query
    let filteredBooksData = booksData

    if(Object.keys(queries).length > 0) {
        // Filter buku berdasarkan query
        filteredBooksData = filteredBooksData.filter(book => {
            return (queries.name ? book.name === queries.name : true ) &&
                (reading ? book.reading === queries.reading : true) &&
                (finished ? book.finished === queries.finished : true)
        })
    }

    // Mengembalikan status success request
    const response = h.response({
        status: "success",
        data: {
            books: filteredBooksData.map(book => {
                return {
                    id: book.id,
                    name: book.name,
                    publisher: book.publisher
                }
            })
        }
    })
    response.code(200)
    return response
}

const getBookHandler = (request, h) => {
    // Mengambil parameter bookId dari request parameter
    const { bookId } = request.params
    // Mengambil spesifik data buku dari books.json
    const bookData = readBook(bookId)
    let response

    // Jika data tersebut ada kembalikan status success request
    if(bookData) {
        response = h.response({
            status: "success",
            data: {
                book: bookData
            }
        })
        response.code(200)    
    } 
    // Jika tidak ada kembalikan status bad request
    else {
        response = h.response({
            status: "fail",
            message: "Buku tidak ditemukan"
        })
        response.code(404)
    }
    return response
}

const postBookHandler = (request, h) => {
    // Mengambil payload data buku dari request body
    const {name, year, author, summary, publisher, pageCount, readPage, reading} = request.payload
    let response

    // Jika nama tidak ada akan mengembalikan status bad request
    if(!name) {
        response = h.response({
            status: "fail",
            "message": "Gagal menambahkan buku. Mohon isi nama buku"
        })
        response.code(400)
        return response
    }
    // Jika readPage > pageCount akan mengembalikan status bad request
    if(readPage > pageCount) {
        response = h.response({
            status: "fail",
            "message": "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
        })
        response.code(400)
        return response
    }
    
    const id = nanoid(10)
    // Membuat data buku baru
    const newBook = {
        name, year, author, summary, publisher, pageCount, readPage, reading,
        id: id,
        finished: readPage === pageCount ? true : false,
        insertedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
    // Menyimpan buku ke dalam books.json
    addBook(newBook)
    // Mwngembalikan status success request
    response = h.response({
        status: "success",
        "message": "Buku berhasil ditambahkan",
        data: {
            "bookId": id
        }
    })
    response.code(201)
    return response
}

const editBookHandler = (request, h) => {
    // Mengambil parameter bookId dari request parameter
    const { bookId } = request.params
    // Mengambil payload data buku dari request body
    const {name, year, author, summary, publisher, pageCount, readPage, reading} = request.payload
    let response 

    // Jika nama tidak ada akan mengembalikan status bad request
    if(!name) {
        response = h.response({
            status: "fail",
            message: "Gagal memperbarui buku. Mohon isi nama buku"
        })
        response.code(400)
        return response
    }
    // Jika readPage > pageCount akan mengembalikan status bad request
    if(readPage > pageCount) {
        response = h.response({
            status: "fail",
            message: "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount"
        })
        response.code(400)
        return response
    }

    // Mengambil spesifik data buku dari books.json
    const book = readBook(bookId)
    // Jika buku tidak ditemukan, maka kembalikan status bad request
    if(!book) { 
        response = h.response({
            status: "fail",
            message: "Gagal memperbarui buku. Id tidak ditemukan"
        })
        response.code(404)
    } 
    //Jika buku ditemukan, maka kembalikan status success request
    else {
        const updatedBook = {
            name, year, author, summary, publisher, pageCount, readPage, reading,
            finished: readPage === pageCount ? true : false,
        }
        // Melakukan edit buku dan update data di books.json
        editBook(bookId, updatedBook)
        // Mengembalikan status success request
        response = h.response({
            status: "success",
            message: "Buku berhasil diperbarui"
        })
        response.code(200)
    }
    return response
}

const deleteBookHandler = (request, h) => {
    // Mengambil parameter bookId dari request parameter
    const { bookId } = request.params
    // Mengambil spesifik data buku dari books.json 
    const book = readBook(bookId)
    let response

    // Jika buku tidak ditemukan, maka kembalikan status bad request
    if(!book) {
        response = h.response({
            status: "fail",
            message: "Buku gagal dihapus. Id tidak ditemukan"
        })    
        response.code(404)
    } 
    //Jika buku ditemukan, maka kembalikan status success request
    else {
        // Melakukan hapus buku berdasarkan idnya
        deleteBook(bookId)
        // Mengembalikan status success request
        response = h.response({
            status: "success",
            message: "Buku berhasil dihapus"
        })
        response.code(200)
    }
    return response
}

module.exports = {
    getBooksHandler,
    getBookHandler,
    postBookHandler,
    editBookHandler,
    deleteBookHandler
}