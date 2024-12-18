using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace Abstracciones.Modelos
{
    public class Categoria
    {
        public int Id { get; set; }

        [BindProperty(SupportsGet = true)]
        [RegularExpression(@"^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$", ErrorMessage = "El nombre debe contener solo letras")]
        [Required(ErrorMessage = "El nombre es obligatorio.")]
        [StringLength(50, MinimumLength = 2, ErrorMessage = "El nombre debe ser mayor a 2 caracteres y menor a 50 caracteres.")]
        [DisplayName("Nombre")]
        public string? Nombre { get; set; }
    }
}