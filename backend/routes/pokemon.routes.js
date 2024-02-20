import { Router } from "express"
import { addFavoritePokemon, getFavoritePokemons } from "../controllers/pokemon.controller.js"
import { authRequired } from "../middlewares/validateToken.js"
import { validateSchema } from "../middlewares/validator.middleware.js";
import { addPokemonSchema } from "../schemas/pokemons.schema.js";

const router = Router();

router.post("/add", authRequired, validateSchema(addPokemonSchema), addFavoritePokemon);
router.get("/favorites", authRequired, getFavoritePokemons);

export default router;