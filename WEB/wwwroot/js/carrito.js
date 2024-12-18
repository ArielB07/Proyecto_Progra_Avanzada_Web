// carrito.js

function openProductModal(imagen, nombre, precio, categoria, presentacion, cantidad, descripcion, productoId) {
    document.getElementById('modalImage').src = 'data:image/png;base64,' + imagen;
    document.getElementById('modalNombre').textContent = nombre;
    document.getElementById('modalPrecio').textContent = precio;
    document.getElementById('modalCategoria').textContent = categoria;
    document.getElementById('modalPresentacion').textContent = presentacion;
    document.getElementById('modalCantidad').textContent = cantidad;
    document.getElementById('modalDescripcion').textContent = descripcion;
    document.getElementById('addToCartButton').setAttribute('data-product-id', productoId);

    var productModal = new bootstrap.Modal(document.getElementById('productModal'));
    productModal.show();
}

async function agregarAlCarrito() {
    const productoId = document.getElementById('addToCartButton').getAttribute('data-product-id');
    const cantidad = 1;
    const personaId = '@idUsuario';
    let carritoId = await obtenerCarritoActivo(personaId);

    if (!carritoId) {
        carritoId = await crearCarrito(personaId);
        if (!carritoId) {
            Swal.fire('Error', 'No se pudo verificar el carrito. Intenta nuevamente.', 'error');
            return;
        }
    }

    const requestBody = {
        detalleID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        carritoID: carritoId,
        productoID: productoId,
        cantidad: cantidad,
        precioUnitario: 0.01
    };

    const url = `https://localhost:7184/api/Carrito/${carritoId}/agregar?personaId=${personaId}`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (response.ok) {
            Swal.fire({
                icon: "success",
                title: "Producto agregado al carrito exitosamente",
                toast: true,
                position: "top-end",
                timer: 3000,
                showConfirmButton: false
            });
        } else {
            console.error('Error al agregar producto al carrito');
            Swal.fire({
                icon: "error",
                title: "Error al agregar producto al carrito",
                toast: true,
                position: "top-end",
                timer: 3000,
                showConfirmButton: false
            });
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        Swal.fire({
            icon: "error",
            title: "No se pudo conectar al servidor",
            toast: true,
            position: "top-end",
            timer: 3000,
            showConfirmButton: false
        });
    }
}

async function obtenerCarritoActivo(personaId) {
    const url = `https://localhost:7184/api/Carrito/activo/${personaId}`;

    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            return data.carritoID;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error al obtener carrito activo:', error);
        return null;
    }
}

async function crearCarrito(personaId) {
    const url = `https://localhost:7184/api/Carrito/crear/${personaId}`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const data = await response.json();
            return data.carritoId;
        } else {
            console.error('Error al crear el carrito');
            return null;
        }
    } catch (error) {
        console.error('Error en la solicitud de creación del carrito:', error);
        return null;
    }
}
