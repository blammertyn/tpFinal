$(document).ready(function() {
    // Verificar si hay un tema guardado en localStorage
    const temaGuardado = localStorage.getItem('tema');
    if (temaGuardado) {
        aplicarTema(temaGuardado);
    } else {
        // Por defecto, modo claro
        aplicarTema('light');
    }
    
    // Event listeners para los botones de tema
    $('#modo-claro').on('click', function() {
        cambiarTema('light');
    });
    
    $('#modo-oscuro').on('click', function() {
        cambiarTema('dark');
    });
    
    // Función para cambiar el tema
    function cambiarTema(tema) {
        // Guardar el tema en localStorage
        localStorage.setItem('tema', tema);
        
        // Aplicar el tema
        aplicarTema(tema);
        
        // Mostrar notificación de cambio
        mostrarNotificacionTema(tema);
    }
    
    // Función para aplicar el tema
    function aplicarTema(tema) {
        if (tema === 'dark') {
            $('html').attr('data-theme', 'dark');
            $('#modo-oscuro').addClass('active');
            $('#modo-claro').removeClass('active');
        } else {
            $('html').attr('data-theme', 'light');
            $('#modo-claro').addClass('active');
            $('#modo-oscuro').removeClass('active');
        }
        
        // Agregar efecto de transición suave
        $('body').addClass('theme-transition');
        setTimeout(function() {
            $('body').removeClass('theme-transition');
        }, 300);
    }
    
    // Función para mostrar notificación de cambio de tema
    function mostrarNotificacionTema(tema) {
        const mensaje = tema === 'dark' ? '🌙 Modo oscuro activado' : '☀️ Modo claro activado';
        
        // Crear notificación temporal
        const notificacion = $(`
            <div class="theme-notification">
                <span>${mensaje}</span>
            </div>
        `);
        
        // Agregar estilos CSS dinámicamente si no existen
        if (!$('#theme-notification-styles').length) {
            $('head').append(`
                <style id="theme-notification-styles">
                    .theme-notification {
                        position: fixed;
                        top: 20px;
                        right: 20px;
                        background: var(--bg-secondary);
                        color: var(--text-primary);
                        padding: 12px 20px;
                        border-radius: 8px;
                        box-shadow: var(--shadow);
                        z-index: 1000;
                        animation: slideInRight 0.5s ease;
                        border: 2px solid var(--input-focus);
                    }
                    
                    @keyframes slideInRight {
                        from {
                            transform: translateX(100%);
                            opacity: 0;
                        }
                        to {
                            transform: translateX(0);
                            opacity: 1;
                        }
                    }
                    
                    .theme-transition {
                        transition: all 0.3s ease !important;
                    }
                </style>
            `);
        }
        
        // Agregar la notificación al body
        $('body').append(notificacion);
        
        // Remover la notificación después de 3 segundos
        setTimeout(function() {
            notificacion.fadeOut(300, function() {
                $(this).remove();
            });
        }, 3000);
    }
    
    // Efectos adicionales para los botones de tema
    $('.theme-btn').on('mouseenter', function() {
        $(this).css('transform', 'translateY(-2px) scale(1.05)');
    }).on('mouseleave', function() {
        $(this).css('transform', 'translateY(0) scale(1)');
    });
    
    // Detectar preferencia del sistema operativo (opcional)
    function detectarPreferenciaSistema() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            // Si el sistema prefiere modo oscuro y no hay tema guardado
            if (!localStorage.getItem('tema')) {
                cambiarTema('dark');
            }
        }
    }
    
    // Escuchar cambios en la preferencia del sistema
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
            // Solo cambiar si no hay tema guardado manualmente
            if (!localStorage.getItem('tema')) {
                cambiarTema(e.matches ? 'dark' : 'light');
            }
        });
    }
    
    // Detectar preferencia inicial del sistema
    detectarPreferenciaSistema();
    
    // Función para obtener el tema actual
    window.getTemaActual = function() {
        return $('html').attr('data-theme') || 'light';
    };
    
    // Función para alternar entre temas
    window.alternarTema = function() {
        const temaActual = getTemaActual();
        const nuevoTema = temaActual === 'light' ? 'dark' : 'light';
        cambiarTema(nuevoTema);
    };
    
    // Atajo de teclado para alternar tema (Ctrl/Cmd + T)
    $(document).on('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 't') {
            e.preventDefault();
            alternarTema();
        }
    });
    
    // Mostrar información sobre el atajo de teclado
    console.log('💡 Tip: Presiona Ctrl+T (o Cmd+T en Mac) para alternar entre temas rápidamente');
}); 