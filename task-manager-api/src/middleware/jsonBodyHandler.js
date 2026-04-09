export async function jsonBodyHandler (req, res) {
    const buffers = []

    for await (const chunk of req) {
        buffers.push(chunk)
    }

    console.log(JSON.parse(Buffer.concat(buffers).toString()))
}