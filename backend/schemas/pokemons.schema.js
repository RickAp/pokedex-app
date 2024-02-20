import {z} from "zod";

export const addPokemonSchema = z.object({
    name: z.string({
        required_error: "Pokemon name is required"
    }),
    pokemonId: z.number({
        required_error: "Pokemon id is required"
    }),
    imageUrl:  z.string({
        required_error: "Pokemon image is required"
    }),
    types: z.array({
        required_error: "Pokemon types are required"
    }),
});