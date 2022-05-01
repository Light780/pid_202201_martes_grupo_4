namespace AppDepa.Aplicaciones.Dto
{
    public class PersonaDto
    {
        public int PersonaId { get; set; }
        public string NombreCompleto { get; set; }
        public string Documento { get; set; }
        public string TipoDocumento { get; set; }
        public string Telefono { get; set; }
        public string Estado { get; set; }
        public string Correo { get; set; }
        public string Sexo { get; set; }
        public string TipoPersona { get; set; }
        public string Departamento { get; set; }
        public bool Eliminado { get; set; }
        public string FechaRegistro { get; set; }
        public string Usuario { get; set; }
    }
}
