export function read({ req, res, database }) {
    const tableContent = database.select("tasks")
    return res.end(JSON.stringify(tableContent))
}