import http from "node:http"
import { jsonBodyHandler } from "./middlewares/jsonBodyHandler.js"
import { routeHandler } from "./middlewares/routeHandler.js"

const server = http.createServer( async (req, resp) => {
    await jsonBodyHandler(req, resp)
    routeHandler(req, resp)
})
server.listen(3333)
