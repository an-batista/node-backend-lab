export const tickets = [
    {
        method: "GET",
        path: "/tickets",
        controller(req, resp) {
            return resp.end("testando!")
        }
    }
]