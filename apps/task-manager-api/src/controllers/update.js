export function update({req, res, database}) {
   const { title, description } = req.body
   const { id } = req.params
   database.update("tasks", id, {
        title, 
        description,
        updated_at: new Date()
   } )
    return res.writeHead(204).end()
} 