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
        const { ...params } = routeParamsContent.groups
        req.params = params
        req.params.query = req.params.query ? captureQueryParams(req.params.query) : {}
        console.log(req.params.query)
        return route.controller({ req, res, database })
    } s
    return res.writeHead(404).end("Rota não encontrada!")
}