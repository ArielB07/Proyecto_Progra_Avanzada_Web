// pagina.js

function openNewTab(url) {
    window.open(url, "_blank");
}

async function agregarPagina(personaId) {
    const paginaUrl = document.getElementById('url-pagina').value;
    const categoriaId = document.getElementById('categoria-pagina').value;

    const requestBody = {
        url: paginaUrl,
        IdPersona: personaId,
        IdCategoria: categoriaId,
    };
    const url = `https://localhost:7184/api/Pagina`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (response.ok) {
            location.reload();
        } else {
            console.error('Error al agregar la página');
            Swal.fire({
                icon: "error",
                title: "Error al agregar la página",
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