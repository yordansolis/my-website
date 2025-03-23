   // =====================
    // Funcionalidad Modo Oscuro
    // =====================
    // Obtenemos el botón de cambio de tema y los íconos de sol y luna
    const themeToggle = document.getElementById("theme-toggle");
    const sunIcon = themeToggle.querySelector(".sun-icon");
    const moonIcon = themeToggle.querySelector(".moon-icon");

    // Función para alternar el tema oscuro
    function toggleTheme() {
      // Si el atributo 'data-theme' del documento es 'dark', se remueve para volver al modo claro
      if(document.documentElement.getAttribute("data-theme") === "dark"){
        document.documentElement.removeAttribute("data-theme");
        // Se muestra el ícono de sol y se oculta el de luna
        sunIcon.style.display = "block";
        moonIcon.style.display = "none";
      } else {
        // Se activa el modo oscuro asignando 'data-theme' con valor 'dark'
        document.documentElement.setAttribute("data-theme", "dark");
        // Se muestra el ícono de luna y se oculta el de sol
        sunIcon.style.display = "none";
        moonIcon.style.display = "block";
      }
    }
    // Se asigna el event listener al botón para ejecutar la función al hacer clic
    themeToggle.addEventListener("click", toggleTheme);

    // =====================
    // Funcionalidad de Paginación para Blog Posts
    // =====================
    // Seleccionamos todos los artículos del blog y los botones de paginación
    const blogPosts = document.querySelectorAll(".blog-post");
    const paginationButtons = document.querySelectorAll(".pagination-btn");

    // Definimos el número de posts a mostrar por página (en este ejemplo, 2)
    const postsPerPage = 2;
    let currentPage = 1;
    const totalPosts = blogPosts.length;
    const totalPages = Math.ceil(totalPosts / postsPerPage);

    // Función que muestra los posts correspondientes a la página actual
    function showPage(page) {
      // Primero, ocultamos todos los posts
      blogPosts.forEach((post, index) => {
        post.style.display = "none";
      });
      // Calculamos los índices de inicio y fin para la página actual
      const start = (page - 1) * postsPerPage;
      const end = start + postsPerPage;
      // Se muestran solo los posts que estén dentro del rango calculado
      blogPosts.forEach((post, index) => {
        if(index >= start && index < end) {
          post.style.display = "block";
        }
      });
      // Actualizamos la clase "active" en los botones de paginación
      paginationButtons.forEach(btn => {
        btn.classList.remove("active");
        // Para los botones numerados (excluyendo el botón "next")
        if(!btn.classList.contains("next") && parseInt(btn.textContent) === page) {
          btn.classList.add("active");
        }
      });
    }

    // Agregamos event listeners a cada botón de paginación
    paginationButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        // Si el botón es el de "next", se avanza a la siguiente página (si no es la última)
        if(btn.classList.contains("next")) {
          if(currentPage < totalPages) {
            currentPage++;
            showPage(currentPage);
          }
        } else {
          // Para los botones numerados, se obtiene el número de página del texto del botón
          const page = parseInt(btn.textContent);
          if(page && page !== currentPage) {
            currentPage = page;
            showPage(currentPage);
          }
        }
      });
    });

    // Se muestra la primera página al cargar el sitio
    showPage(currentPage);