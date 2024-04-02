import React from 'react';

const categories = [
  { name: 'All', imageUrl: 'https://cdn7.kiwilimon.com/clasificacion/3406/108x108/i3406.jpg.webp' },
  { name: 'Breakfast', imageUrl: 'https://cdn7.kiwilimon.com/clasificacion/3356/108x108/i3356.jpg.webp' },
  { name: 'Lunch', imageUrl: 'https://cdn7.kiwilimon.com/clasificacion/104/108x108/i104.jpg.webp' },
  { name: 'Dinner', imageUrl: 'https://cdn7.kiwilimon.com/clasificacion/67/108x108/i67.jpg.webp' },
  { name: 'Dessert', imageUrl: 'https://cdn7.kiwilimon.com/clasificacion/1/108x108/i1.jpg.webp' }
];

const CategoryMenu = ({ setCategory }) => {
  return (
    <div className="flex flex-wrap justify-center space-x-4 my-4">
      {categories.map((category) => (
        <button
          key={category.name}
          className="flex flex-col items-center bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition duration-300"
          onClick={() => setCategory(category.name)}
        >
          <img
            className="h-16 w-16 mb-2 rounded-full"
            src={category.imageUrl}
            alt={category.name}
          />
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryMenu;
