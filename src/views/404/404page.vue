<template>
    <div class="flex flex-col items-center justify-center h-screen bg-gray-100 text-center px-4">
      <div class="text-6xl font-bold text-sky-600 mb-4">
        404
      </div>
      <h1 class="text-2xl md:text-4xl font-bold mb-4">
        ¡Página no encontrada!
      </h1>
      <p class="text-md md:text-lg text-gray-600 mb-8">
        Lo sentimos, pero la página que buscas no existe o ha sido movida.
      </p>
      <router-link
        to="/"
        class="inline-block bg-sky-600 text-white font-semibold py-2 px-4 rounded hover:bg-sky-700 transition-colors"
      >
        Regresar al Inicio
      </router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: "NotFound",
  };
  </script>
  