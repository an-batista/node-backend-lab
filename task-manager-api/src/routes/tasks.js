import { create } from "../controllers/create.js";
import { read } from "../controllers/read.js";

export const tasks = [
    {
        method: "GET",
        path: "/tasks",
        controller: read
    },
    {
        method: "POST",
        path: "/tasks",
        controller: create
    }
]