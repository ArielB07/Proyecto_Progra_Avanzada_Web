using Abstracciones.Modelos;
using BC;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Text.Json;

namespace WEB.Pages.Paginas
{
    public class MisPaginasModel : PageModel
    {
        private Configuracion _configuracion;

        [BindProperty] public List<Pagina> paginas { get; set; } = [];
        [BindProperty] public List<Categoria> categorias { get; set; } = [];

        public MisPaginasModel(Configuracion configuration)
        {
            _configuracion = configuration;
        }

        public async Task<ActionResult> OnGet()
        {
            categorias = await GetCategorias();
            string urlEndPoint = _configuracion.ObtenerEndPoint("ObtenerPaginas");

            var cliente = new HttpClient();

            var idUsuario = Abstracciones.Modelos.Autenticacion.ClaimsPrincipalExtensions.GetIdUsuario(User);

            var solicitud = new HttpRequestMessage(HttpMethod.Get, string.Format(urlEndPoint, idUsuario));

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

                    paginas = JsonSerializer.Deserialize<List<Pagina>>(resultado, options);
                    paginas.ForEach(pagina =>
                    {
                        pagina.NombreCategoria = categorias.Find(x => x.Id == pagina.IdCategoria).Nombre;
                    });
                }
                catch (JsonException ex)
                {
                    return Page();
                }
            }
            return Page();
        }

        public async Task<List<Categoria>> GetCategorias()
        {
            string urlEndPoint = _configuracion.ObtenerEndPoint("ObtenerCategorias");

            var cliente = new HttpClient();

            var solicitud = new HttpRequestMessage(HttpMethod.Get, string.Format(urlEndPoint));

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

                    return JsonSerializer.Deserialize<List<Categoria>>(resultado, options);
                }
                catch (JsonException ex)
                {
                    return [];
                }
            }
            return [];
        }
    }
}
