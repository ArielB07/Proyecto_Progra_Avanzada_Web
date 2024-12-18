namespace Abstracciones.Modelos
{
    public class Pagina
    {
        public string? Nombre { get; set; }
        public string? Url { get; set; }
        public Guid IdPersona { get; set; }
        public string? Imagen { get; set; }
        public int IdCategoria { get; set; }
        public string? NombreCategoria { get; set; }
    }
}