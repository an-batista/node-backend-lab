import { parse } from "csv-parse"
import fs, { createReadStream } from "node:fs"

parse({
    columns: true,
    skip_empty_lines: true
})

const stream = createReadStream("./src/data/createTask.csv").pipe(parse({ columns: true }))

for await (const record of stream) {
    console.log(record)
}