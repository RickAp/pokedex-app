import axios from "axios";

const API = "http://127.0.0.1:4000/api";

export const displayPokemons = async (page, searchTerm = '') => {
    const limit = 10; 
    return await axios.get(`${API}/pokemons`, {
        params: { page, limit, search: searchTerm }
    });   
}