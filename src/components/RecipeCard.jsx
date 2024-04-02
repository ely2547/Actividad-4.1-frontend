
import React from 'react';
import { motion } from 'framer-motion';

const RecipeCard = ({ recipe, openModal }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="cursor-pointer card bg-white text-gray-800 p-4 rounded-lg shadow-md"
      onClick={() => openModal(recipe)}
    >
      <img src={recipe.image} alt={recipe.title} className="w-full h-32 object-cover rounded-t-lg" />
      <div className="p-4">
        <h3 className="text-lg font-bold">{recipe.title}</h3>
        <p>{recipe.summary}</p>
      </div>
    </motion.div>
  );
};

export default RecipeCard;
