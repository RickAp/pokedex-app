import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import axios from "axios";

export const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = new User ({
            username,
            email,
            password: hashPassword,
        })

        const userSaved = await newUser.save();
        const token = await createAccessToken({ id: userSaved._id });

        res.cookie("token", token);
        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email:userSaved.email,
            token: token
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {

        const userFound = await User.findOne({ email });
        if (!userFound) return res.status(400).json({ message: "User not found" });
        const isMatch = await bcrypt.compare(password, userFound.password);
        if (!isMatch) return res.status(400).json({ message: "Incorrect password" });

        const token = await createAccessToken({ id: userFound._id });

        res.cookie("token", token);
        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            token: token
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const logout = async (req, res) => {
    res.cookie('token', "", {
        expires: new Date(0)
    })
    return res.sendStatus(200);
};

export const pokemons = async (req, res) => {
    try {
        
        const page = parseInt(req.query.page, 20) || 1;
        const limit = parseInt(req.query.limit, 20) || 20;
        const offset = (page - 1) * limit;
        const searchTerm = req.query.search;

        let url = `https://pokeapi.co/api/v2/pokemon?limit=1000`; 
        const { data } = await axios.get(url);
        
        let pokemonList = data?.results;

        if (searchTerm) {
            pokemonList = pokemonList.filter(pokemon => 
                pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        const paginatedPokemons = pokemonList.slice((page - 1) * limit, page * limit);

        const detailedPokemons = await Promise.all(paginatedPokemons.map(async (pokemon) => {
            const pokemonDetails = await axios.get(pokemon.url);
            return {
                name: pokemonDetails.data.name,
                imageUrl: pokemonDetails.data.sprites.front_default,
                types: pokemonDetails.data.types.map((type) => type.type.name),
                count: data.count,
                currentPage: page,
                totalPages: Math.ceil(data.count / limit),
            };
        }));

        res.json(detailedPokemons);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
