
import React from 'react';
import { motion } from 'framer-motion';

const RecipeDetailsModal = ({ recipe, closeModal }) => {
  const [details, setDetails] = React.useState(null);

  React.useEffect(() => {
    if (recipe) {
      fetch(`https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=63dda04b47d0406a9559597876be5ed4`)
        .then(response => response.json())
        .then(data => setDetails(data));
    }
  }, [recipe]);

  if (!details) return null;

  const handleOutsideClick = e => {
    if (e.target.classList.contains('modal-background')) {
      closeModal();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 modal-background"
      onClick={handleOutsideClick}
      style={{ overflowY: 'scroll' }} 
    >
  
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
        <img src={details.image} alt={details.title} className="w-full h-64 object-cover rounded-t-lg" />
        <div className="p-4">
          <h3 className="text-lg font-bold mb-2">{details.title}</h3>
          <h4 className="font-bold mt-4">Ingredientes:</h4>
          <ul>
            {details.extendedIngredients.map(ingredient => (
              <li key={ingredient.id}>{ingredient.original}</li>
            ))}
          </ul>
          <h4 className="font-bold mt-4">Preparación:</h4>
          <ol>
            {details.analyzedInstructions[0].steps.map(step => (
              <li key={step.number}>{step.step}</li>
            ))}
          </ol>
        </div>
        <button
          onClick={closeModal}
          className="mt-4 bg-red-500 text-white p-2 rounded hover:bg-red-700 transition duration-300"
        >
          Cerrar
        </button>
      </div>
    </motion.div>
  );
};

export default RecipeDetailsModal;
