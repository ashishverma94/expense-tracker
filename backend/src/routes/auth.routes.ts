import { Router } from "express";
import { validate } from "../middleware/validate.middleware";
import { register, login } from "../controllers/auth.controller";
import { registerSchema, loginSchema } from "../validations/auth.validation";

const router = Router();

router.post("/login", validate(loginSchema), login);
router.post("/register", validate(registerSchema), register);

export default router;
