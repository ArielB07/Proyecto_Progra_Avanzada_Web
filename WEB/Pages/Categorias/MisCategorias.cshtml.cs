using Abstracciones.Modelos;
using BC;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Text.Json;

namespace WEB.Pages.Categorias
{
    public class MisCategoriasModel : PageModel
    {
        private Configuracion _configuracion;

        [BindProperty] public IEnumerable<Categoria> categorias { get; set; } = default!;

        public MisCategoriasModel(Configuracion configuration)
        {
            _configuracion = configuration;
        }
        public async Task<ActionResult> OnGet(Guid id)
        {
            string urlEndPoint = _configuracion.ObtenerEndPoint("ObtenerCategorias");

            var cliente = new HttpClient();

            var solicitud = new HttpRequestMessage(HttpMethod.Get, string.Format(urlEndPoint, id));

            var respuesta = await cliente.SendAsync(solicitud);

            if (respuesta.IsSuccessStatusCode)
            {
                var resultado = await respuesta.Content.ReadAsStringAsync();
                try
                {
                    var options = new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true
                    };

                    categorias = JsonSerializer.Deserialize<IEnumerable<Categoria>>(resultado, options);
                }
                catch (JsonException ex)
                {
                    return Page();
                }
            }
            return Page();
        }
    }
}
