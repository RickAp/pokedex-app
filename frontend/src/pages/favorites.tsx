import React, { useEffect, useState } from "react";
import { getPokemons } from "../../api/auth";
import { useSelector } from "react-redux";
import NavBar from "@/components/NavBar/NavBar";

interface Pokemon {
    name: string;
    imageUrl: string;
    types: string[]; 
}

const Favorites = () => {

    const TOKEN = useSelector((state: { user: { token: string } }) => state.user.token);

    const [pokemons, setPokemons] = useState<Pokemon[]>([]);

    useEffect(() => {
        const fetchPokemons  = async () => {
            try {
                const res = await getPokemons(TOKEN);
                setPokemons(res?.data);
                console.log(res.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchPokemons();
    }, []);

    return (
        <div>
            <NavBar />
            <div className="max-w-7xl mx-auto mt-8">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {pokemons.map((pokemon: Pokemon, index: number) => (
                        <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden transform hover:-translate-y-3 duration-300 ease-in-out">
                            <img
                                src={pokemon?.imageUrl}
                                alt={pokemon?.name}
                                className="w-full object-cover" 
                                style={{ height: '200px' }}
                            />
                            <div className="p-4 text-center">
                                <h2 className="text-xl font-bold capitalize">{pokemon?.name}</h2>
                                <div className="flex justify-center gap-2">
                                    {pokemon?.types.map((type: string, typeIndex: number) => (
                                        <span 
                                            key={typeIndex} 
                                            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 mt-2"
                                        >
                                            {type}
                                        </span>
                                    ))}
                                </div>
                                <span 
                                    className="inline-block bg-[#FFCC01] rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 mt-2"
                                >
                                    Favorite
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Favorites;