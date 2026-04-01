import { routes } from "../routes/index.js";
export function routeHandler(req, resp) {
    const route = routes.find((route) => {
        return route.method === req.method && route.path === req.url
    })

    if(route) {
        return route.controller(req, resp)
    }else {
        return resp.writeHead(404).end()
    }
}