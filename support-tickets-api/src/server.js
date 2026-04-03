import http from "node:http"
import { jsonBodyHandler } from "./middlewares/jsonBodyHandler.js"
import { routeHandler } from "./middlewares/routeHandler.js"

const server = http.createServer( async (req, resp) => {
    console.log("Hello World!")
    await jsonBodyHandler(req, resp)
    routeHandler(req, resp)
})

server.listen(3333)
