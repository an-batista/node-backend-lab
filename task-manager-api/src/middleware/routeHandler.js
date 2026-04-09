import { tasks } from "../routes/tasks.js"
import { Database } from "../database/Database.js"

const database = new Database()

export function routeHandler(req, res) {
    const { method, url } = req
    const route = tasks.find((route) => {
       return route.method === method && route.path === url
    })
    if(route) {
        return route.controller({ req, res, database })
    }
    return res.writeHead(404).end("Rota não encontrada!")
}