import { FastifyInstance } from "fastify";
import z from "zod";
import { db } from "../database";
import { randomUUID } from "node:crypto";



export async function mealsRoutes(app: FastifyInstance) {

    app.get("/meals", async (request, reply) => {
        const meals =  await db("meals").select()
        return {
            meals
        }
    })

    app.post("/meals", async (request, reply) => {
        const createMealsBodySchema =  z.object({
            name: z.string(),
            description: z.string(),
            isOnDiet: z.boolean()
        })

        const { name, description, isOnDiet} = createMealsBodySchema.parse(request.body)

        

        await db("meals")
        .insert({
            id: randomUUID(),
            name,
            description,
            is_on_diet: isOnDiet
        })

        return reply.status(201).send()

    })
}