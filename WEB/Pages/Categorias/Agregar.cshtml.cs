using Abstracciones.Modelos;
using BC;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Net.Http.Headers;

namespace WEB.Pages.Categorias
{
    public class AgregarModel : PageModel
    {
        [BindProperty] public Categoria categoria { get; set; } = default!;

        private readonly Configuracion _configuracion;

        public AgregarModel(Configuracion configuracion)
        {
            _configuracion = configuracion;
        }

        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }

            string endPoint = _configuracion.ObtenerEndPoint("AgregarCategoria");

            using var cliente = new HttpClient();
            cliente.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            var respuesta = await cliente.PostAsJsonAsync(endPoint, categoria);

            if (!respuesta.IsSuccessStatusCode)
            {
                ModelState.AddModelError("categoria", "Ocurrió un error en el servidor. Inténtalo más tarde.");
                return Page();
            }

            return RedirectToPage("./MisCategorias");
        }
    }
}
