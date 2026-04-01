import http from "node:http"
import { jsonBodyHandler } from "./middlewares/jsonBodyHandler.js"

const server = http.createServer( async (req, resp) => {
    await jsonBodyHandler(req, resp)
    return resp.end("Created server!")
})

server.listen(3333)
