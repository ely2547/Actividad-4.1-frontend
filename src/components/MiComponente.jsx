import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RecipeCard from './RecipeCard';
import CategoryMenu from './CategoryMenu';
import SearchBar from './SearchBar';
import RecipeDetailsModal from './RecipeDetailsModal';

function MiComponente() {
  // Estado para almacenar las recetas obtenidas de la API
  const [recipes, setRecipes] = useState([]);
  // Estado para almacenar el término de búsqueda ingresado por el usuario
  const [search, setSearch] = useState('');
  // Estado para almacenar la receta seleccionada para mostrar detalles en el modal
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  // Estado para controlar la apertura y cierre del modal de detalles de la receta
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Efecto que se ejecuta al cambiar el término de búsqueda para obtener recetas de la API
  useEffect(() => {
    fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${search}&apiKey=63dda04b47d0406a9559597876be5ed4`)
      .then(response => response.json())
      .then(data => setRecipes(data.results));
  }, [search]);

  // Función para abrir el modal de detalles de la receta seleccionada
  const openModal = (recipe) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  };

  // Función para cerrar el modal de detalles de la receta
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRecipe(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-6">Busca y prepara recetas deliciosas</h2>

      {/* Componente de barra de búsqueda que actualiza el estado de búsqueda */}
      <SearchBar setSearch={setSearch} />
      {/* Componente de menú de categorías que actualiza el estado de búsqueda */}
      <CategoryMenu setCategory={setSearch} />
      {/* Contenedor de tarjetas de recetas con animación de framer-motion */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        {recipes.map(recipe => (
          // Componente de tarjeta de receta que muestra la información y permite abrir el modal
          <RecipeCard key={recipe.id} recipe={recipe} openModal={openModal} />
        ))}
      </motion.div>
      {/* Animación de presencia para mostrar u ocultar el modal de detalles de la receta */}
      <AnimatePresence>
        {isModalOpen && <RecipeDetailsModal recipe={selectedRecipe} closeModal={closeModal} />}
      </AnimatePresence>
    </div>
  );
}

export default MiComponente;
