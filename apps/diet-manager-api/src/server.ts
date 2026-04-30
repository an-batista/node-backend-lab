import fastify from "fastify"
import { mealsRoutes } from "./routes/mealsRoutes"

const app = fastify()

app.register(mealsRoutes, {
    prefix:"meals"
})

app.listen({
    port: 3333
}).then(() => {
   console.log("http server running") 
})