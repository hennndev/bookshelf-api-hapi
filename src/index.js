const Hapi = require("@hapi/hapi")
const bookRoutes = require("./routes/bookRoutes")

const init = async () => {
    const server = Hapi.server({
        port: 9000,
        host: "localhost"
    })
    server.route(bookRoutes)
    await server.start()
        .then(() => console.log("Server connected to port 9000"))
        .catch(() => console.error("Server failed connected to port 9000"))
}

init()