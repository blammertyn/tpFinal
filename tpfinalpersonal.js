// Función para validar email
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Función para limpiar mensajes de error
function limpiarErrores() {
    const errores = document.querySelectorAll('.error-mensaje');
    errores.forEach(error => {
        error.textContent = '';
    });
    
    const inputs = document.querySelectorAll('.form-input, .form-textarea');
    inputs.forEach(input => {
        input.classList.remove('error');
    });
}

// Función para mostrar mensaje de error
function mostrarError(campo, mensaje) {
    const errorElement = document.getElementById(`${campo}-error`);
    const inputElement = document.getElementById(campo);
    
    if (errorElement) {
        errorElement.textContent = mensaje;
    }
    
    if (inputElement) {
        inputElement.classList.add('error');
    }
}

// Función para mostrar mensaje de éxito
function mostrarMensajeExito(nombre) {
    const container = document.getElementById('mensaje-container');
    container.innerHTML = `
        <div class="mensaje-exito">
            <h3>¡Gracias por tu contacto, ${nombre}!</h3>
            <p>En breve le estaré respondiendo.</p>
        </div>
    `;
    
    // Limpiar el formulario
    document.getElementById('contacto-form').reset();
    
    // Hacer scroll hacia el mensaje
    container.scrollIntoView({ behavior: 'smooth' });
}

// Función para mostrar mensaje de error general
function mostrarMensajeError(mensaje) {
    const container = document.getElementById('mensaje-container');
    container.innerHTML = `
        <div class="mensaje-error">
            <h3>Error en el formulario</h3>
            <p>${mensaje}</p>
        </div>
    `;
    
    // Hacer scroll hacia el mensaje
    container.scrollIntoView({ behavior: 'smooth' });
}

// Función principal de validación
function validarFormulario(event) {
    event.preventDefault();
    
    // Limpiar errores previos
    limpiarErrores();
    
    // Obtener valores de los campos
    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const asunto = document.getElementById('asunto').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();
    
    let hayErrores = false;
    let erroresGenerales = [];
    
    // Validar nombre
    if (!nombre) {
        mostrarError('nombre', 'El nombre es obligatorio');
        hayErrores = true;
        erroresGenerales.push('Nombre');
    } else if (nombre.length < 2) {
        mostrarError('nombre', 'El nombre debe tener al menos 2 caracteres');
        hayErrores = true;
        erroresGenerales.push('Nombre');
    }
    
    // Validar email
    if (!email) {
        mostrarError('email', 'El email es obligatorio');
        hayErrores = true;
        erroresGenerales.push('Email');
    } else if (!validarEmail(email)) {
        mostrarError('email', 'Por favor ingrese un email válido');
        hayErrores = true;
        erroresGenerales.push('Email');
    }
    
    // Validar asunto
    if (!asunto) {
        mostrarError('asunto', 'El asunto es obligatorio');
        hayErrores = true;
        erroresGenerales.push('Asunto');
    } else if (asunto.length < 5) {
        mostrarError('asunto', 'El asunto debe tener al menos 5 caracteres');
        hayErrores = true;
        erroresGenerales.push('Asunto');
    }
    
    // Validar mensaje
    if (!mensaje) {
        mostrarError('mensaje', 'El mensaje es obligatorio');
        hayErrores = true;
        erroresGenerales.push('Mensaje');
    } else if (mensaje.length < 10) {
        mostrarError('mensaje', 'El mensaje debe tener al menos 10 caracteres');
        hayErrores = true;
        erroresGenerales.push('Mensaje');
    }
    
    // Si hay errores, mostrar mensaje general
    if (hayErrores) {
        const mensajeError = `Por favor corrija los siguientes campos: ${erroresGenerales.join(', ')}`;
        mostrarMensajeError(mensajeError);
        return false;
    }
    
    // Si todo está correcto, mostrar mensaje de éxito
    mostrarMensajeExito(nombre);
    return true;
}

// Función para validación en tiempo real
function validarCampoEnTiempoReal(campo) {
    const valor = campo.value.trim();
    const campoId = campo.id;
    
    // Remover clase de error si existe
    campo.classList.remove('error');
    
    // Limpiar mensaje de error
    const errorElement = document.getElementById(`${campoId}-error`);
    if (errorElement) {
        errorElement.textContent = '';
    }
    
    // Validar según el tipo de campo
    switch (campoId) {
        case 'nombre':
            if (valor && valor.length < 2) {
                mostrarError('nombre', 'El nombre debe tener al menos 2 caracteres');
            }
            break;
        case 'email':
            if (valor && !validarEmail(valor)) {
                mostrarError('email', 'Por favor ingrese un email válido');
            }
            break;
        case 'asunto':
            if (valor && valor.length < 5) {
                mostrarError('asunto', 'El asunto debe tener al menos 5 caracteres');
            }
            break;
        case 'mensaje':
            if (valor && valor.length < 10) {
                mostrarError('mensaje', 'El mensaje debe tener al menos 10 caracteres');
            }
            break;
    }
}

// Event listeners cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('contacto-form');
    const inputs = document.querySelectorAll('.form-input, .form-textarea');
    
    // Event listener para el envío del formulario
    if (formulario) {
        formulario.addEventListener('submit', validarFormulario);
    }
    
    // Event listeners para validación en tiempo real
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validarCampoEnTiempoReal(this);
        });
        
        input.addEventListener('input', function() {
            // Remover error cuando el usuario empiece a escribir
            this.classList.remove('error');
            const errorElement = document.getElementById(`${this.id}-error`);
            if (errorElement) {
                errorElement.textContent = '';
            }
        });
    });
    
    // Efecto de focus para mejorar UX
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
            this.parentElement.style.transition = 'transform 0.2s ease';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });
});

// Función para mostrar mensaje de carga (opcional)
function mostrarCarga() {
    const btn = document.getElementById('enviar-btn');
    if (btn) {
        btn.textContent = 'Enviando...';
        btn.disabled = true;
    }
}

// Función para ocultar mensaje de carga
function ocultarCarga() {
    const btn = document.getElementById('enviar-btn');
    if (btn) {
        btn.textContent = 'Enviar';
        btn.disabled = false;
    }
} 