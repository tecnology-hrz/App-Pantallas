// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function () {

    // Seleccionar todas las tarjetas de opciones
    const optionCards = document.querySelectorAll('.option-card');

    // Agregar efecto de ripple al hacer clic
    optionCards.forEach(card => {
        card.addEventListener('click', function (e) {
            // Crear efecto ripple
            createRipple(e, this);

            // Obtener la opción seleccionada
            const option = this.getAttribute('data-option');

            // Agregar clase de selección
            this.classList.add('selected');

            // Simular navegación después de la animación
            setTimeout(() => {
                handleOptionSelection(option);
            }, 600);
        });

        // Efecto hover mejorado con sonido (opcional)
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px) scale(1.03)';
        });

        card.addEventListener('mouseleave', function () {
            if (!this.classList.contains('selected')) {
                this.style.transform = '';
            }
        });
    });

    // Función para crear efecto ripple
    function createRipple(event, element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        element.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // Función para manejar la selección de opciones
    function handleOptionSelection(option) {
        console.log('Opción seleccionada:', option);

        // Aquí puedes agregar la lógica de navegación
        switch (option) {
            case 'facial':
                showSurgeriesSection();
                break;
            case 'corporal':
                showCorporalSurgeriesSection();
                break;
            case 'cirugias':
                alert('Navegando a Más Cirugías...');
                // window.location.href = 'mas-cirugias.html';
                break;
            case 'prevaloacion':
                alert('Navegando a Pre-valoración...');
                // window.location.href = 'pre-valoracion.html';
                break;
        }

        // Remover clase de selección después de la navegación
        setTimeout(() => {
            document.querySelectorAll('.option-card').forEach(card => {
                card.classList.remove('selected');
            });
        }, 1000);
    }

    // Función para mostrar la sección de cirugías
    function showSurgeriesSection() {
        const mainContainer = document.querySelector('.container');
        const surgeriesSection = document.getElementById('facial-surgeries');

        mainContainer.style.display = 'none';
        surgeriesSection.style.display = 'block';

        // Inicializar funcionalidad de la sección de cirugías
        initSurgeriesSection();
    }

    // Función para volver al menú principal
    function backToMenu() {
        const mainContainer = document.querySelector('.container');
        const surgeriesSection = document.getElementById('facial-surgeries');
        const corporalSection = document.getElementById('corporal-surgeries');

        surgeriesSection.style.display = 'none';
        if (corporalSection) {
            corporalSection.style.display = 'none';
        }
        mainContainer.style.display = 'flex';

        // Detener cualquier audio que esté reproduciéndose
        if (window.currentSpeech) {
            window.speechSynthesis.cancel();
        }
    }

    // Función para mostrar la sección de cirugías corporales
    function showCorporalSurgeriesSection() {
        const mainContainer = document.querySelector('.container');
        const corporalSection = document.getElementById('corporal-surgeries');

        mainContainer.style.display = 'none';
        corporalSection.style.display = 'block';

        // Inicializar funcionalidad de la sección de cirugías corporales
        initCorporalSurgeriesSection();
    }

    // Inicializar la sección de cirugías corporales
    function initCorporalSurgeriesSection() {
        console.log('Inicializando sección de cirugías corporales...');

        // Botón de volver
        const backButton = document.getElementById('back-to-menu-corporal');
        if (backButton) {
            backButton.addEventListener('click', backToMenu);
            console.log('Botón de volver (corporal) inicializado');
        }

        // Esperar un momento para que el DOM se actualice
        setTimeout(() => {
            // Accordions en la sección corporal
            const corporalSection = document.getElementById('corporal-surgeries');
            const accordionToggles = corporalSection.querySelectorAll('.accordion-toggle');
            console.log('Botones de accordion encontrados (corporal):', accordionToggles.length);

            accordionToggles.forEach((toggle, index) => {
                console.log('Agregando listener al botón corporal', index);

                // Remover listeners anteriores si existen
                const newToggle = toggle.cloneNode(true);
                toggle.parentNode.replaceChild(newToggle, toggle);

                newToggle.addEventListener('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('¡Click detectado en accordion toggle corporal!', index);

                    const surgeryItem = this.closest('.surgery-item');
                    if (!surgeryItem) {
                        console.error('No se encontró surgery-item');
                        return;
                    }

                    const isActive = surgeryItem.classList.contains('active');
                    console.log('Estado actual:', isActive ? 'activo' : 'inactivo');

                    // Cerrar todos los demás accordions
                    corporalSection.querySelectorAll('.surgery-item').forEach(item => {
                        item.classList.remove('active');
                    });

                    // Toggle el actual
                    if (!isActive) {
                        surgeryItem.classList.add('active');
                        console.log('✓ Accordion abierto');
                    } else {
                        console.log('✓ Accordion cerrado');
                    }
                });
            });

            // Botones de audio en la sección corporal
            const audioButtons = corporalSection.querySelectorAll('.audio-btn');
            console.log('Botones de audio encontrados (corporal):', audioButtons.length);

            audioButtons.forEach((btn, index) => {
                // Remover listeners anteriores si existen
                const newBtn = btn.cloneNode(true);
                btn.parentNode.replaceChild(newBtn, btn);

                newBtn.addEventListener('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Click en botón de audio corporal', index);
                    const text = this.getAttribute('data-text');
                    toggleSpeech(text, this);
                });
            });

            console.log('✓ Inicialización completa (corporal)');
        }, 100);
    }

    // Inicializar la sección de cirugías
    function initSurgeriesSection() {
        console.log('Inicializando sección de cirugías...');

        // Botón de volver
        const backButton = document.getElementById('back-to-menu');
        if (backButton) {
            backButton.addEventListener('click', backToMenu);
            console.log('Botón de volver inicializado');
        }

        // Esperar un momento para que el DOM se actualice
        setTimeout(() => {
            // Accordions
            const accordionToggles = document.querySelectorAll('.accordion-toggle');
            console.log('Botones de accordion encontrados:', accordionToggles.length);

            accordionToggles.forEach((toggle, index) => {
                console.log('Agregando listener al botón', index);

                // Remover listeners anteriores si existen
                const newToggle = toggle.cloneNode(true);
                toggle.parentNode.replaceChild(newToggle, toggle);

                newToggle.addEventListener('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('¡Click detectado en accordion toggle!', index);

                    const surgeryItem = this.closest('.surgery-item');
                    if (!surgeryItem) {
                        console.error('No se encontró surgery-item');
                        return;
                    }

                    const isActive = surgeryItem.classList.contains('active');
                    console.log('Estado actual:', isActive ? 'activo' : 'inactivo');

                    // Cerrar todos los demás accordions
                    document.querySelectorAll('.surgery-item').forEach(item => {
                        item.classList.remove('active');
                    });

                    // Toggle el actual
                    if (!isActive) {
                        surgeryItem.classList.add('active');
                        console.log('✓ Accordion abierto');
                    } else {
                        console.log('✓ Accordion cerrado');
                    }
                });
            });

            // Botones de audio
            const audioButtons = document.querySelectorAll('.audio-btn');
            console.log('Botones de audio encontrados:', audioButtons.length);

            audioButtons.forEach((btn, index) => {
                // Remover listeners anteriores si existen
                const newBtn = btn.cloneNode(true);
                btn.parentNode.replaceChild(newBtn, btn);

                newBtn.addEventListener('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Click en botón de audio', index);
                    const text = this.getAttribute('data-text');
                    toggleSpeech(text, this);
                });
            });

            console.log('✓ Inicialización completa');
        }, 100);
    }

    // Función para manejar text-to-speech
    function toggleSpeech(text, button) {
        // Si ya hay algo reproduciéndose
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
            document.querySelectorAll('.audio-btn').forEach(btn => {
                btn.classList.remove('playing');
            });
            return;
        }

        // Crear nueva síntesis de voz
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'es-ES';
        utterance.rate = 0.9;
        utterance.pitch = 1;

        // Agregar clase de reproducción
        button.classList.add('playing');

        // Cuando termine de hablar
        utterance.onend = function () {
            button.classList.remove('playing');
        };

        // Si hay error
        utterance.onerror = function () {
            button.classList.remove('playing');
            alert('Lo sentimos, no se pudo reproducir el audio. Tu navegador puede no soportar esta función.');
        };

        // Reproducir
        window.speechSynthesis.speak(utterance);
    }

    // Animación de entrada para las tarjetas
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    optionCards.forEach(card => {
        observer.observe(card);
    });

    // Prevenir el comportamiento por defecto en dispositivos táctiles
    optionCards.forEach(card => {
        card.addEventListener('touchstart', function (e) {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });

        card.addEventListener('touchend', function (e) {
            setTimeout(() => {
                if (!this.classList.contains('selected')) {
                    this.style.transform = '';
                }
            }, 100);
        });
    });

    // Agregar efecto parallax suave al mover el mouse (solo en desktop)
    if (window.innerWidth > 768) {
        document.addEventListener('mousemove', function (e) {
            const cards = document.querySelectorAll('.option-card');
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;

            cards.forEach((card, index) => {
                const speed = (index + 1) * 2;
                const x = (mouseX - 0.5) * speed;
                const y = (mouseY - 0.5) * speed;

                if (!card.matches(':hover')) {
                    card.style.transform = `translate(${x}px, ${y}px)`;
                }
            });
        });
    }
});

// Agregar estilos CSS para el efecto ripple dinámicamente
const style = document.createElement('style');
style.textContent = `
    .option-card {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(216, 27, 96, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .option-card.selected {
        animation: pulse 0.6s ease-out;
    }
    
    @keyframes pulse {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
        100% {
            transform: scale(1);
        }
    }
`;
document.head.appendChild(style);
