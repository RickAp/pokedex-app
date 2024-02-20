import React, { useEffect, useState } from "react";
import { displayPokemons } from "../../api/auth";

const Home = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchError, setSearchError] = useState(false);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const res = searchTerm
          ? await displayPokemons(1, searchTerm) 
          : await displayPokemons(currentPage);

        setFilteredPokemons(res?.data); 
        setTotalPages(res?.data[0].totalPages); 
        setSearchError(searchTerm && res?.data.length === 0);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPokemons();
  }, [currentPage, searchTerm]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div>
      <div className="navbar bg-red-500 h-20 w-full text-white flex items-center justify-center">
        <img src="logo.png" alt="logo" className="w-50 h-16" />
      </div>
      <div className="flex justify-center my-4">
        <input
          type="text"
          placeholder="Search for a Pokémon"
          className="p-2 border border-gray-300 rounded outline-none" 
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="bg-gray-100 p-4">
        {searchError && <div className="text-center text-xl text-red-600">Pokémon not found. Try another search.</div>}
        <div className="max-w-7xl mx-auto mt-11">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredPokemons.map((pokemon, index) => (
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
                    {pokemon?.types.map((type, typeIndex) => (
                      <span 
                        key={typeIndex} 
                        className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 mt-2"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
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