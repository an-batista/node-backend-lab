import { parse } from "csv-parse"
import fs, { createReadStream } from "node:fs"

parse({
    columns: true,
    skip_empty_lines: true
})

const csvStream = createReadStream("./src/data/createTask.csv").pipe(parse({ columns: true }))

for await (const body of csvStream) {
    const fetchResponse = await fetch("http://localhost:3333/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    })
    try {
        console.log(fetchResponse.status)
    } catch (error) {
        console.log(error)
    }
}
