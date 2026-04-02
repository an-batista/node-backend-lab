import { randomUUID } from "node:crypto"
 
export function create({ req, resp }) {
    const { equipment, description, user_name } = req.body

    const tickets = {
        id: randomUUID(),
        equipment,
        description,
        user_name,
        status: "open",
        created_at: new Date(),
        updated_at: new Date()

    }
    

    return resp.writeHead(201).end(JSON.stringify(tickets))
}