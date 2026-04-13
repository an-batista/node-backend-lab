export function remove({ req, res, database }) {
    const { id } = req.params
    database.delete("tasks", id)
    return res.end()
}