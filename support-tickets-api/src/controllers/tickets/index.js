export function index({req, resp, database}) {
    const { status } = req.query
    const filters = status ? { status } : null
    const tickets = database.select("tickets", filters)
    return resp.end(JSON.stringify(tickets))
}