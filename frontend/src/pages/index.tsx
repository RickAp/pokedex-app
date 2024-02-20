import React, { useEffect, useState } from "react";
import { displayPokemons } from "../../api/auth";
import NavBar from "@/components/NavBar/NavBar";
import Link from "next/link";
import { useSelector } from "react-redux";
import { login, logout } from '@/redux/userSlice';
import { useDispatch } from 'react-redux';
import { addPokemon } from "../../api/auth";
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

interface Pokemon {
  name: string;
  imageUrl: string;
  types: string[]; 
}

const Home = () => {

  const TOKEN = useSelector((state: { user: { token: string } }) => state.user.token);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchError, setSearchError] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const res = searchTerm
          ? await displayPokemons(1, searchTerm) 
          : await displayPokemons(currentPage);

        setFilteredPokemons(res?.data); 
        setTotalPages(res?.data[0].totalPages); 
        setSearchError(!!searchTerm && res?.data.length === 0);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPokemons();
  }, [currentPage, searchTerm]);

  useEffect(() => {
    if (TOKEN) {
      localStorage.setItem('token', TOKEN);
    }

    const token = localStorage.getItem('token');

    if (!TOKEN && token) {
      dispatch(login({ token: token }));
    }

  }, [TOKEN])

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const logoutSession = () => {
    dispatch(logout());
    localStorage.removeItem('token');
  };

  const addFavoritePokemon = async (pokemon: Pokemon) => {
    try {
      if (!TOKEN) {
        toast.error("You must be logged in to add favorites");
        return;
      }
      const res = await addPokemon(TOKEN, pokemon);
      console.log(res);
      toast.success(`${pokemon.name} added to favorites`);
    } catch (error) {
      console.log(error);
    }  
  };

  const goToFavorites = () => {
    if (!TOKEN) return toast.error("You must be logged in to add favorites");

    router.push("/favorites");
  };

  const typeToColor = {
    fire: "bg-red-500",
    water: "bg-blue-500",
    grass: "bg-green-500",
    electric: "bg-yellow-500",
    psychic: "bg-purple-500",
    normal: "bg-gray-500",
    poison: "bg-purple-500",
    bug: "bg-lime-500",
    flying: "bg-sky-500",
    ground: "bg-stone-500",
    fairy: "bg-pink-500",
    fighting: "bg-slate-500",
    rock: "bg-zinc-500",
    ghost: "bg-indigo-500",
    ice: "bg-cyan-500",
    dragon: "bg-orange-500",
    steel: "bg-stone-500",
    dark: "bg-nutral-500"
  };

  return (
    <div>
      <NavBar />
      <div className="flex justify-between my-4 px-11">
        <input
          type="text"
          placeholder="Search for a Pokémon"
          className="p-2 border border-gray-300 rounded outline-none" 
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex space-x-5 ml-2">
          {!TOKEN && (
            <Link href="/register">
              <button className="border border-gray-300 rounded-full py-2 px-5 text-gray-500 transform  hover:bg-[#FFCC01] duration-300 ease-in-out hover:text-white">
                Sign Up
              </button>
          </Link>
          )}
          {!TOKEN 
            ? 
              <Link href="/login">
                <button 
                  className="border border-gray-300 rounded-full py-2 px-5 text-gray-500 transform hover:bg-[#2A6EB6] duration-300 ease-in-out hover:text-white"
                >
                  Sign In
                </button>
              </Link>
            : <button 
                className="border border-gray-300 rounded-full py-2 px-5 text-gray-500 transform hover:bg-red-500 duration-300 ease-in-out hover:text-white"
                onClick={logoutSession}
              >
                Sign Out
              </button>
            }
        </div>
      </div>
      <div className="bg-gray-100 p-4">
        {searchError && <div className="text-center text-xl text-red-600">Pokémon not found. Try another search.</div>}
        <div className="max-w-7xl mx-auto mt-8">
          <button
            onClick={goToFavorites}
            className="bg-green-500 rounded-full text-white py-3 px-6 mb-4 transform hover:bg-green-600 duration-300 ease-in-out"
          >
            Go To Favorites
          </button>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredPokemons.map((pokemon: Pokemon, index: number) => (
              <div 
                key={index} 
                className="bg-white shadow-md rounded-lg overflow-hidden transform hover:-translate-y-3 duration-300 ease-in-out"
              >
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
                        className={`inline-block  ${typeToColor[type as keyof typeof typeToColor] || "bg-gray-200"} rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2 mt-2`}
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                  <button 
                    className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 mt-2 hover:bg-gray-400 duration-300 ease-in-out"
                    onClick={() => addFavoritePokemon(pokemon)}
                  >
                    Add to favorites
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-10">
          <button 
            onClick={() => handlePageChange(currentPage - 1)} 
            disabled={currentPage === 1}
            className="bg-red-500 rounded-full text-white py-3 px-6 mr-5 transform hover:bg-red-600 duration-300 ease-in-out"
          >
            Previous
          </button>
          <span className="text-[20px] mt-2">{currentPage} of {totalPages}</span>
          <button 
            onClick={() => handlePageChange(currentPage + 1)} 
            disabled={currentPage === totalPages}
            className="bg-green-500 rounded-full text-white py-3 px-6 ml-5 transform hover:bg-green-600 duration-300 ease-in-out"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;