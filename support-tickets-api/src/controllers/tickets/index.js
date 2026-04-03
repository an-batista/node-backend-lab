export function index({req, resp, database}) {
    const tickets = database.select("tickets")
    return resp.end(JSON.stringify(tickets))
}