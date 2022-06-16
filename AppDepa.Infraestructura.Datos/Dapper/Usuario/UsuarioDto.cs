namespace AppDepa.Infraestructura.Datos.Dapper.Usuario
{
    public class UsuarioDto
    {
        public int UsuarioId { get; set; }
        public string UserName { get; set; }
        public string NombreCompleto { get; set; }
        public string Email { get; set; }
        public string FotoPerfil { get; set; }
    }
}
