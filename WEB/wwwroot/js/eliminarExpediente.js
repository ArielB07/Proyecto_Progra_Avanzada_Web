function confirmDeleteExpediente(expedienteID) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "No podrás deshacer esta acción",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            deleteExpediente(expedienteID);
        }
    });
}

async function deleteExpediente(expedienteID) {
    try {
        const response = await fetch(`https://localhost:7184/api/Expediente?ExpedienteID=${expedienteID}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            Swal.fire(
                'Eliminado!',
                'El expediente ha sido eliminado.',
                'success'
            ).then(() => {
                location.reload(); // Refresca la página
            });
        } else {
            Swal.fire(
                'Error!',
                'No se pudo eliminar el expediente.',
                'error'
            );
        }
    } catch (error) {
        Swal.fire(
            'Error!',
            'Hubo un problema con la eliminación.',
            'error'
        );
    }
}