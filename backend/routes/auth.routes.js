import { Router } from "express"
import { login, register, logout, pokemons } from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/pokemons", pokemons);

export default router;