import type { FastifyInstance } from "fastify";
import z from "zod"
import { db } from "../database";




export function metricsRoutes(app: FastifyInstance) {
    app.get("/", async (request, reply) => {
        const { sessionId } = request.cookies
        const user = await db("users").where({ session_id: sessionId }).first()

        if (!user) {
            return reply.status(401).send({
                error: "Unauthorized"
            })
        }

        const [result] = await db("meals")
        .where({ user_id: user.id })
        .count("id as total")

        const totalMeals = Number(result?.total ?? 0)

        const [onDietResult] = await db("meals")
        .where({ user_id: user.id, is_on_diet: true})
        .count("id as total")

        const [offDietResult] = await db("meals")
        .where({ user_id: user.id, is_on_diet: false })
        .count("id as total")
    
        const totalOnDietMeals = Number(onDietResult?.total ?? 0)
        const totalOffDietMeals = Number(offDietResult?.total ?? 0)

        const meals = await db("meals")
        .where({ user_id: user.id })
        .orderBy("created_at", "asc")
        .orderBy("id", "asc")

        let bestOnDietMealsSequence = 0
        let currentSequence = 0
        for(const meal of meals) {
            const isOnDiet = meal.is_on_diet === 1
            if(isOnDiet) {
                currentSequence += 1
                if(currentSequence > bestOnDietMealsSequence) {
                    bestOnDietMealsSequence = currentSequence
                }
            }else {
                currentSequence = 0
            }
        }
        return {
            totalMeals,
            totalOnDietMeals,
            totalOffDietMeals,
            bestOnDietMealsSequence
        }
    })
}