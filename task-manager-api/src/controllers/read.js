export function read({ req, res, database }) {
    const { title = null, description = null } = req.query
    const filters = Object.fromEntries(
        Object.entries({ title, description })
        .filter(([key, value]) => value !== null && value.trim() !== '')
    )
    const tableContent = database.select("tasks", filters)
    return res.end(JSON.stringify(tableContent))
}