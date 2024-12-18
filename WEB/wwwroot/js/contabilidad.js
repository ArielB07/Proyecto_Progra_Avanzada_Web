var ctx = document.getElementById('financialChart').getContext('2d');
var financialChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Consultas Veterinarias', 'Cirugías y Procedimientos', 'Venta de Medicamentos y Productos', 'Vacunas', 'Salarios del Personal', 'Suministros Médicos y Equipos', 'Alquiler del Local', 'Servicios Públicos', 'Publicidad y Marketing', 'Mantenimiento y Reparaciones', 'Otros Gastos Operativos'],
        datasets: [{
            label: 'Monto (CRC)',
            data: [15000, 8000, 5000, 2000, -12000, -6000, -4000, -1500, -1000, -500, -500],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function (value) {
                        return '₡' + value;
                    }
                }
            }
        }
    }
});