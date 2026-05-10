import { type FastifyInstance } from "fastify";
import z from "zod";
import { db } from "../database";
import { randomUUID } from "node:crypto";
import { checkSessionIdExists } from "../middleware/checkSessionIdExists";



export async function mealsRoutes(app: FastifyInstance) {

    app.get("/",
        {
            preHandler: [checkSessionIdExists]
        },
        async (request, reply) => {
            const { sessionId } = request.cookies
            const user = await db("users").where({ session_id: sessionId }).first()

            const meals = await db("meals").where({ user_id: user.id }).select()
            return {
                meals
            }
        })

    app.get("/:id",
        {
            preHandler: [checkSessionIdExists]
        },
        async (request, reply) => {
            const { sessionId } = request.cookies
            const requestParamSchema = z.object({
                id: z.uuid()
            })
            const { id } = requestParamSchema.parse(request.params)

            const user = await db("users").where({ session_id: sessionId }).first()

            const meal = await db("meals").where({ user_id: user.id, id }).first()
            return {
                meal
            }
        })

    app.put("/:id",
        {
            preHandler: [checkSessionIdExists]
        },
        async (request, reply) => {
            const { sessionId } = request.cookies
            const nonEmptyString = z.string().trim().min(1)
            const requestParamSchema = z.object({
                id: z.uuid()
            })
            const requestBodySchema = z.object({
                name: nonEmptyString,
                description: nonEmptyString,
                is_on_diet: z.boolean()
            })
                .partial()
                .refine((data) => Object.keys(data).length > 0, { message: "send at least one topic to update" })

            const { id } = requestParamSchema.parse(request.params)
            const { name, description, is_on_diet } = requestBodySchema.parse(request.body)

            const user = await db("users").where({ session_id: sessionId }).first()

            await db("meals").where({ user_id: user.id, id }).first().update({
                name,
                description,
                is_on_diet,
                updated_at: db.fn.now()
            })
            return reply.status(204).send()
        })

    app.post("/",
        {
            preHandler: [checkSessionIdExists]
        },
        async (request, reply) => {
            const { sessionId } = request.cookies
            const nonEmptyString = z.string().trim().min(1)

            const createMealsBodySchema = z.object({
                name: nonEmptyString,
                description: nonEmptyString,
                is_on_diet: z.boolean()
            })

            const user = await db("users").where({ session_id: sessionId }).first()

            if (!user) {
                return reply.status(401).send({
                    error: "Unknow User"
                })
            }

            const { name, description, is_on_diet } = createMealsBodySchema.parse(request.body)
            await db("meals")
                .insert({
                    id: randomUUID(),
                    name,
                    description,
                    is_on_diet,
                    user_id: user.id
                })


            return reply.status(201).send()
        })

    app.delete("/:id",
        {
            preHandler: [checkSessionIdExists]
        },

        async (request, reply) => {
            const { sessionId } = request.cookies

            const requestParamSchema = z.object({
                id: z.uuid()
            })
            const { id } = requestParamSchema.parse(request.params)
            const user = await db("users").where({ session_id: sessionId }).first()
        
            await db("meals")
                .where({ user_id: user.id, id })
                .delete()
            return reply.status(204).send()
        })
}

