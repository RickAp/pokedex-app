import axios from "axios";

interface RegisterUser {
    username: string;
    email: string;
    password: string;
}

interface LogInUser {
    email: string;
    password: string;
}

interface Pokemon {
    name: string;
    imageUrl: string;
    types: string[];
}

const API = "http://127.0.0.1:4000/api";

export const registerRequest = (user: RegisterUser) => axios.post(`${API}/register`, user);
export const loginRequest = (user: LogInUser) => axios.post(`${API}/login`, user);

export const displayPokemons = async (page: number, searchTerm = '') => {
    const limit = 10; 
    return await axios.get(`${API}/pokemons`, {
        params: { page, limit, search: searchTerm }
    });   
};

export const addPokemon = (token: string, pokemon: Pokemon) => {
    return axios.post(`${API}/add`, pokemon, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

export const getPokemons = (token: string) => {
    return axios.get(`${API}/favorites`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
};