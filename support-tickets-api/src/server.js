import http from "node:http"

const server = http.createServer((req, resp) => {
    return resp.end("Created server!")
})

server.listen(3333)
