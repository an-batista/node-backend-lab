import { tasks } from "../routes/tasks.js"
import { Database } from "../database/Database.js"
import { captureQueryParams } from "../utils/captureQueryParams.js"

const database = new Database()

export function routeHandler(req, res) {
    const { method, url } = req
    const route = tasks.find((route) => {
       return route.method === method && route.path.test(url)
    })
    if(route) {
        const routeParamsContent = url.match(route.path)
        const { query, ...params } = routeParamsContent.groups
        req.params = params
        req.query = query ? captureQueryParams(query) : {}
        return route.controller({ req, res, database })
    }
    return res.writeHead(404).end("Rota não encontrada!")
} 