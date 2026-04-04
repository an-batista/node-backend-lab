export function updateStatus({ req, resp, database }) {
    const { id } = req.params
    const { solution } = req.body
    database.update("tickets", id, { status: "closed", solution })
    return resp.end()
}   