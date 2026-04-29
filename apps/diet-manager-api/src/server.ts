import fastify from "fastify"
import { mealsRoutes } from "./routes/mealsRoute"


const app = fastify()

app.register(mealsRoutes, {
    prefix: "/meals"
})

app.listen({
    port: 3333
}).then(() => {
   console.log("http server running") 
})