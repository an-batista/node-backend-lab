import http from "node:http"
import { routeHandler } from "./middleware/routeHandler.js"
import { jsonBodyHandler } from "./middleware/jsonBodyHandler.js"

const server = http.createServer(async (req, res) => {
    await jsonBodyHandler(req, res)
    routeHandler(req, res)
})
server.listen(3333)

