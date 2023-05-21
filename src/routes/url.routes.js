import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { postUrlShortens, getUrlById } from "../controllers/url.controllers.js";
import urlSchema from "../schemas/urlSchema.js";
import { authValidation } from "../middlewares/authSchema.middleware.js";

const urlRouter = Router()

urlRouter.post("/urls/shorten", validateSchema(urlSchema), authValidation, postUrlShortens)
urlRouter.get("/urls/:id", getUrlById);
urlRouter.get("/urls/open/:shortUrl");
urlRouter.delete("/urls/:id");

export default urlRouter