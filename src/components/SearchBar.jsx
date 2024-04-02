
import React from 'react';

const SearchBar = ({ setSearch }) => {
  return (
    <div className="flex justify-center my-4">
      <input
        type="text"
        placeholder="Buscar recetas..."
        className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
