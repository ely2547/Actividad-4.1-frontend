import React, { useState, useEffect } from 'react'; 
import { motion } from 'framer-motion'; 

class Encuesta extends React.Component { // Declaración de la clase Encuesta que extiende de React.Component
  constructor(props) { // Constructor de la clase Encuesta
    super(props); // Llamada al constructor de la clase padre
    this.state = { // Inicialización del estado de la clase Encuesta
      preguntas: [], // Arreglo para almacenar las preguntas
      resultados: {}, // Objeto para almacenar los resultados de las votaciones
      modalAbierto: false, // Estado para controlar la apertura y cierre de un modal
    };
  }

  componentDidMount() { // Método que se ejecuta después de que el componente ha sido montado en el DOM
    const preguntasGuardadas = JSON.parse(localStorage.getItem('preguntas')) || []; // Recuperación de preguntas guardadas en el localStorage
    const resultadosGuardados = JSON.parse(localStorage.getItem('resultados')) || {}; // Recuperación de resultados guardados en el localStorage
    this.setState({ preguntas: preguntasGuardadas, resultados: resultadosGuardados }); // Actualización del estado con las preguntas y resultados recuperados
  }

  // Método para agregar una nueva pregunta al estado y almacenarla en el localStorage
  agregarPregunta = (nuevaPregunta) => {
    this.setState(prevState => ({
      preguntas: [...prevState.preguntas, nuevaPregunta]
    }), () => {
      localStorage.setItem('preguntas', JSON.stringify(this.state.preguntas));
    });
  }

  // Método para registrar un voto en una pregunta y opción específica, actualizando el estado y el localStorage
  votar = (pregunta, opcion) => {
    this.setState(prevState => ({
      resultados: {
        ...prevState.resultados,
        [pregunta]: {
          ...prevState.resultados[pregunta],
          [opcion]: (prevState.resultados[pregunta] && prevState.resultados[pregunta][opcion] ? prevState.resultados[pregunta][opcion] + 1 : 1)
        }
      }
    }), () => {
      localStorage.setItem('resultados', JSON.stringify(this.state.resultados));
    });
  }

  // Método para abrir el modal
  abrirModal = () => {
    this.setState({ modalAbierto: true });
  }

  // Método para cerrar el modal
  cerrarModal = () => {
    this.setState({ modalAbierto: false });
  }

  // Método para manejar la creación de una nueva pregunta, agregándola y cerrando el modal
  manejarNuevaPregunta = (nuevaPregunta) => {
    this.agregarPregunta(nuevaPregunta);
    this.cerrarModal();
  }

  render() { // Método que renderiza el componente Encuesta
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500 p-6 dark:from-gray-700 to-gray-900">
        <h1 className="text-5xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-600"> 
          Crea una encuesta para que otros usuarios la respondan
        </h1>
        <div className="w-full max-w-4xl bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden px-10 py-8"> 
          <div className="encuesta space-y-6"> 
            {this.state.preguntas.map((pregunta, index) => ( // Mapeo de las preguntas
              <div key={index} className="mb-6"> 
                <div className="text-xl font-semibold text-gray-900 dark:text-gray-100">{pregunta.texto}</div> 
                <div className="flex flex-wrap -m-2"> 
                  {pregunta.opciones.map((opcion, i) => ( // Mapeo de las opciones de la pregunta
                    <motion.button // Botón animado
                      key={i}
                      className="bg-purple-600 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded-full m-2 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => this.votar(pregunta.texto, opcion)} // Función para votar por una opción
                    >
                      {opcion}
                    </motion.button>
                  ))}
                </div>
              </div>
            ))}
            <button // Botón para agregar una nueva pregunta
              className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
              onClick={this.abrirModal} // Función para abrir el modal de nueva pregunta
            >
              Agregar Pregunta
            </button>
            {this.state.modalAbierto && ( // Condicional para mostrar el modal de nueva pregunta
              <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="miModal"> 
                <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"> 
                  <div className="mt-3 text-center"> 
                    <span className="text-gray-900 font-semibold text-xl mb-2 block">Agregar Nueva Pregunta</span> 
                    <div className="mt-2 px-7 py-3"> 
                      <form onSubmit={(e) => { // Manejador de envío del formulario
                        e.preventDefault();
                        const nuevaPregunta = {
                          texto: e.target.pregunta.value,
                          opciones: e.target.opciones.value.split(',').map(opcion => opcion.trim())
                        };
                        this.manejarNuevaPregunta(nuevaPregunta); // Función para manejar la nueva pregunta
                      }}>
                        <input type="text" name="pregunta" placeholder="Escribe la pregunta aquí" required className="block w-full px-4 py-2 mb-4 rounded border border-gray-300 focus:border-blue-500" /> 

                        <input type="text" name="opciones" placeholder="Escribe las opciones separadas por comas" required className="block w-full px-4 py-2 mb-4 rounded border border-gray-300 focus:border-blue-500" />
                        <button type="submit" className="bg-purple-600 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110">
                          Crear Pregunta
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="resultados mt-10">
              <h3 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-600 mb-6">Resultados Totales:</h3>
              {Object.keys(this.state.resultados).map((pregunta, index) => (
                <div key={index} className="mb-4">
                  <div className="text-lg font-bold text-gray-900 dark:text-white">{pregunta}</div>
                  <div className="flex flex-wrap justify-start items-center mt-2">
                    {Object.entries(this.state.resultados[pregunta]).map(([opcion, votos], i) => (
                      <div key={i} className="flex items-center mb-2 w-full">
                        <div className="text-sm font-medium text-white px-4 py-1 bg-purple-600 rounded-l-full">{opcion}</div>
                        <div className="flex-1 bg-purple-300 rounded-r-full py-1 text-center text-purple-800" style={{ width: `${(votos / Object.values(this.state.resultados[pregunta]).reduce((a, b) => a + b, 0)) * 100}%` }}>
                          {votos} votos
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
}

export default Encuesta;
