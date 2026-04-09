import { randomUUID } from "node:crypto"

export function create({ req, res, database }) {
    const { title, description } = req.body
    const task = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: new Date(),
        updated_at: new Date()
    }
    database.create("tasks", task )
    return res.writeHead(201).end(JSON.stringify(task))
}