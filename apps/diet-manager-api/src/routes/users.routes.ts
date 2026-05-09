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
            password: z.number()
        })

        const { name, email, password } = requestBodySchema.parse(request.body)

        

        await db("users").insert({
            id: randomUUID(),
            name,
            email,
            password
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