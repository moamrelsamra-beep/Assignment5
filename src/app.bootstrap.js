import express from "express"
import { connectionDB, syncDB } from "./DB/connectionDB.js" //[cite: 10]
import { setupRelations } from "./DB/models/relations.js"
import userRouter from "./modules/users/user.controller.js" //[cite: 10]
import postRouter from "./modules/posts/post.controller.js"
import commentRouter from "./modules/comments/comment.controller.js"

const app = express()
const port = 3000 //[cite: 10]

const bootstrap = async () => {
    app.use(express.json()) //[cite: 10]
    app.get('/', (req, res) => res.status(200).json({ msg: "Hello world" })) //[cite: 10]

    // Initialize relations before syncing
    setupRelations()

    // the database connection is ready before the app starts handling requests[cite: 10]
    await connectionDB() //[cite: 10]
    await syncDB() //[cite: 10]

    app.use("/users", userRouter) //[cite: 10]
    app.use("/posts", postRouter)
    app.use("/comments", commentRouter)

    app.use((req, res) => { //[cite: 10]
        res.status(404).json({ //[cite: 10]
            message: `req with url:${req.originalUrl} with method:${req.method} not found`, //[cite: 10]
            status: 404 //[cite: 10]
        })
    })

    app.listen(port, () => 
        console.log(`App is listening on port ${port}`)) //[cite: 10]
}

export default bootstrap //[cite: 10]


