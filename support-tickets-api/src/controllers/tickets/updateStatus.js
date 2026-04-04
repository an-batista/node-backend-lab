export function updateStatus({ req, resp, database }) {
    const { id } = req.params
    database.update("tickets", id, { status: "close" })
    return resp.end()
}