import { create } from "../controllers/create.js";

export const tasks = [
    {
        method: "GET",
        path: "/tasks",
        controller: ""
    },
    {
        method: "POST",
        path: "/tasks",
        controller: create
    }
]