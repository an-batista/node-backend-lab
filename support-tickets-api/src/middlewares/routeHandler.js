import { routes } from "../routes/index.js";
import { Database } from "../database/Database.js"

const database = new Database()

export function routeHandler(req, resp) {
    const route = routes.find((route) => {
        return route.method === req.method && route.path.test(req.url)
    })

    if(route) {
        return route.controller({ req, resp, database })
    }else {
        return resp.writeHead(404).end()
    }
}