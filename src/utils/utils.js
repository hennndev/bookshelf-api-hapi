const fs = require("fs")

const readBooks = () => {
    const booksData = fs.readFileSync("./src/data/books.json")
    const parsedBooksData = JSON.parse(booksData)
    return parsedBooksData
}

const readBook = (bookId) => {
    const booksData = fs.readFileSync("./src/data/books.json")
    const parsedBooksData = JSON.parse(booksData)
    const book = parsedBooksData.find(book => book.id === bookId)
    return book
}

const addBook = (newBook) => {
    const booksData = fs.readFileSync("./src/data/books.json")
    const parsedBooksData = JSON.parse(booksData)
    parsedBooksData.push(newBook)
    fs.writeFileSync("./src/data/books.json", JSON.stringify(parsedBooksData))
}

const editBook = (id, newData) => {
    const booksData = fs.readFileSync("./src/data/books.json")
    const parsedBooksData = JSON.parse(booksData)
    const newBooksData = parsedBooksData.map(book => {
        if(book.id === id) {
            return {
                ...book,
                ...newData
            }
        } else {
            return book
        }
    })
    fs.writeFileSync("./src/data/books.json", JSON.stringify(newBooksData))
}

const deleteBook = (id) => {
    const booksData = fs.readFileSync("./src/data/books.json")
    const parsedBooksData = JSON.parse(booksData)
    const newBooksData = parsedBooksData.filter(book => book.id !== id)
    fs.writeFileSync("./src/data/books.json", JSON.stringify(newBooksData))
}

module.exports = {
    readBooks, 
    readBook,
    addBook,
    editBook,
    deleteBook
}