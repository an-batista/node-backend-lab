import { create } from "../controllers/create.js";
import { read } from "../controllers/read.js";
import { remove } from "../controllers/remove.js";
import { update } from "../controllers/update.js";
import { parseRoutePath } from "../utils/parseRoutePath.js";

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
    },
    {
        method: "PUT",
        path: "/tasks/:id",
        controller: update
    },
    {
        method: "DELETE",
        path: "/tasks/:id",
        controller: remove
    }
].map((route) => ({
    ...route,
    path: parseRoutePath(route.path)
}))