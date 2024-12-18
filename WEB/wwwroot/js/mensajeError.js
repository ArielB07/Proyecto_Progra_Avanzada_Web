document.addEventListener("DOMContentLoaded", function () {

    var obtenerMensaje = document.getElementById("attentionMessage").value;

    if (obtenerMensaje && obtenerMensaje !== "") {
        Swal.fire({
            title: 'Atención',
            text: attentionMessage,
            icon: 'warning',
            confirmButtonText: 'Aceptar'
        });
    }
});