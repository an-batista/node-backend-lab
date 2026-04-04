export function remove({req, resp, database}) {
    const { id } = req.params
    database.delete("tickets", id)
    return resp.end()
} 