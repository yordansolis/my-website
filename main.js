   // =====================
    // Funcionalidad Modo Oscuro
    // =====================
    // Obtenemos el botón de cambio de tema y los íconos de sol y luna
    const themeToggle = document.getElementById("theme-toggle");
    const sunIcon = themeToggle.querySelector(".sun-icon");
    const moonIcon = themeToggle.querySelector(".moon-icon");

    // Función para guardar el tema en localStorage
    function saveTheme(theme) {
      localStorage.setItem('theme', theme);
    }

    // Función para cargar el tema desde localStorage
    function loadTheme() {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
      } else {
        document.documentElement.removeAttribute('data-theme');
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
      }
    }

    // Función para alternar el tema oscuro
    function toggleTheme() {
      // Si el atributo 'data-theme' del documento es 'dark', se remueve para volver al modo claro
      if(document.documentElement.getAttribute("data-theme") === "dark"){
        document.documentElement.removeAttribute("data-theme");
        // Se muestra el ícono de sol y se oculta el de luna
        sunIcon.style.display = "block";
        moonIcon.style.display = "none";
        // Guardamos el tema claro en localStorage
        saveTheme('light');
      } else {
        // Se activa el modo oscuro asignando 'data-theme' con valor 'dark'
        document.documentElement.setAttribute("data-theme", "dark");
        // Se muestra el ícono de luna y se oculta el de sol
        sunIcon.style.display = "none";
        moonIcon.style.display = "block";
        // Guardamos el tema oscuro en localStorage
        saveTheme('dark');
      }
    }

    // Cargamos el tema guardado al iniciar la página
    document.addEventListener('DOMContentLoaded', loadTheme);

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

    // =====================
    // Funcionalidad del Menú Móvil
    // =====================
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Animación del botón hamburguesa
        menuToggle.classList.toggle('active');
    });

    // Cerrar el menú cuando se hace clic en un enlace
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });

    // Image Carousel Functionality
    document.addEventListener('DOMContentLoaded', function() {
        const carousel = document.querySelector('.carousel-track');
        const slides = document.querySelectorAll('.carousel-slide');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        let currentSlide = 0;
        const slideCount = slides.length;

        // Function to update carousel position
        function updateCarousel() {
            carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
        }

        // Previous button click handler
        prevBtn.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + slideCount) % slideCount;
            updateCarousel();
        });

        // Next button click handler
        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % slideCount;
            updateCarousel();
        });

        // Image zoom functionality
        const images = document.querySelectorAll('.carousel-slide img');
        
        // Create modal for zoomed image
        const modal = document.createElement('div');
        modal.className = 'image-modal';
        document.body.appendChild(modal);

        // Add styles for modal
        const style = document.createElement('style');
        style.textContent = `
            .image-modal {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.9);
                z-index: 1000;
                justify-content: center;
                align-items: center;
            }
            .image-modal img {
                max-width: 90%;
                max-height: 90vh;
                object-fit: contain;
            }
            .image-modal.active {
                display: flex;
            }
        `;
        document.head.appendChild(style);

        // Add click event to images
        images.forEach(img => {
            img.style.cursor = 'zoom-in';
            img.addEventListener('click', () => {
                modal.innerHTML = `<img src="${img.src}" alt="${img.alt}">`;
                modal.classList.add('active');
            });
        });

        // Close modal when clicking outside the image
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                modal.classList.remove('active');
            }
        });
    });