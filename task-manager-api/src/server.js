import http from "node:http"
import { routeHandler } from "./middleware/routeHandler.js"

const server = http.createServer((req, res) => {
    routeHandler(req, res)
})


server.listen(3333)