import http from "node:http"

const server = http.createServer((req, res) => {
    return res.end("server created!")
})


server.listen(3333)