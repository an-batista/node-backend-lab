export async function jsonBodyHandler(req, resp) {
    const buffers = []
    for await(const chunk of req) {
        buffers.push(chunk)
    }

    try {
        req.body = JSON.parse(Buffer.concat(buffers).toString())
    } catch (error) {
        req.body = null
    }

    resp.setHeader("Content-Type", "application/json")
}
