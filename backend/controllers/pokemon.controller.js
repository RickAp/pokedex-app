import Pokemon from "../models/pokemon.model";

export const addFavoritePokemon = async (req, res) => {

    const { pokemonId, name, imageUrl, types } = req.body;
    const userId = req.user.id;

    try {
      
      const newFavorite = new Pokemon({
        name,
        pokemonId,
        imageUrl,
        types,
        user: userId
      });
  
   
      await newFavorite.save();
  
      res.status(201).json(newFavorite);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

export const getFavoritePokemons = async (req, res) => {
    try {
      const userId = req.user.id;
      const favoritePokemons = await Pokemon.find({ user: userId }).populate("user");
  
      res.status(200).json(favoritePokemons);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };