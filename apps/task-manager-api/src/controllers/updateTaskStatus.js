export function updateTaskStatus ({ req, res, database }) {
    const { id } = req.params
    database.toggleTaskStatus("tasks", id)
    return res.end()
}   