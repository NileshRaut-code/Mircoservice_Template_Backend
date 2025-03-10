import { app } from "./app.js"
import { dbconnect } from "./db/index.js";

dbconnect().then(()=>{
    app.listen(8002,()=>{
        console.log("Your Server hase Started @ 8002");
    })
}).catch(()=>{console.log("Server has been Crashed");
})