import { type FastifyInstance } from "fastify";
import z, { object, uuid } from "zod";
import { db } from "../database";
import { randomUUID } from "node:crypto";



export async function mealsRoutes(app: FastifyInstance) {

    app.get("/", async (request, reply) => {
        const meals =  await db("meals").select()
        return {
            meals
        }
    })

    app.get("/:id", async (request, reply) => {
        const requestParamSchema = z.object({
            id: uuid()
        })
        const { id } = requestParamSchema.parse(request.params)
        const meal = await db("meals").where({ id }).first()
        return {
            meal
        }
    })

    app.put("/:id", async (request, reply) => {
        const nonEmptyString = z.string().trim().min(1)
         const requestParamSchema = z.object({
            id: uuid()
        })
        const requestBodySchema = z.object({
            name: nonEmptyString,
            description: nonEmptyString,
            is_on_diet: z.boolean()
        })
        .partial()
        .refine((data) => Object.keys(data).length > 0, { message: "send at least one topic to update" })

        const  { id } = requestParamSchema.parse(request.params)
        const { name, description, is_on_diet } = requestBodySchema.parse(request.body)

        await db("meals").where({ id }).first().update({
            name,
            description,
            is_on_diet,
            updated_at: db.fn.now()
        })
        return reply.status(204).send()
    })

    app.post("/", async (request, reply) => {
        const nonEmptyString = z.string().trim().min(1)
        const createMealsBodySchema =  z.object({
            name: nonEmptyString,
            description: nonEmptyString,
            is_on_diet: z.boolean()
        })
        const { name, description, is_on_diet} = createMealsBodySchema.parse(request.body)
        await db("meals")
        .insert({
            id: randomUUID(),
            name,
            description,
            is_on_diet
        })
        return reply.status(201).send()
    })

    app.delete("/:id", async (request, reply) => {
        const requestParamSchema = z.object({
            id: uuid()
        })
        const { id } = requestParamSchema.parse(request.params)
        await db("meals")
        .where({ id })
        .delete()
        return reply.status(204).send()
    })
}

