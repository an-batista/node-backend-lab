import { create } from "../controllers/tickets/create.js"

export const tickets = [
    {
        method: "GET",
        path: "/tickets",
        controller(req, resp) {
            return resp.end("testando!")
        },
    },
    {
        method: "POST",
        path: "/tickets",
        controller: create

    }
]