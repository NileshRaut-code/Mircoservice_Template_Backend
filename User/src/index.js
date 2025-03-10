import { app } from "./app.js"
import { dbconnect } from "./db/index.js";

dbconnect().then(()=>{
    app.listen(8001,()=>{
        console.log("Your Server hase Started @ 8001");
    })
}).catch(()=>{console.log("Server has been Crashed");
})