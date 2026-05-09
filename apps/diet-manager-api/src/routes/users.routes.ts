import type { FastifyInstance } from "fastify";
import z, { email, uuid } from "zod";
import { id } from "zod/locales";
import { db } from "../database";
import { randomUUID } from "node:crypto";



export async function usersRoutes(app: FastifyInstance) {
    app.post("/", async (request, reply) => {
        const requestBodySchema = z.object({
            name: z.string(),
            email: z.string(),
            password: z.string()
        })

        const { name, email, password } = requestBodySchema.parse(request.body)

        const sessionId = randomUUID()



        await db("users").insert({
            id: randomUUID(),
            name,
            email,
            password,
            session_id: sessionId
        })

        reply.cookie("sessionId", sessionId, {
            path: "/",
            maxAge: 60 * 60 * 60 * 24 * 7
        })

        return reply.status(201).send()
    })


    app.get("/", async (request, reply) => {
        const users = await db("users").select()
        return {
            users
        }
    })
}