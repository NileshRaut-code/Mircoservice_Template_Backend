
import { Router } from "express";
import { AuthAll, ProductAll } from "../controller/product.js";
import {Auth} from "../middleware/Auth.js";

const route=Router()
route.get("/all",ProductAll)
route.get("/authall",Auth,AuthAll)
export default route;
