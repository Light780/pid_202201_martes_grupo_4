namespace AppDepa.Infraestructura.Datos.Dapper.Visita
{
    public class VisitaDto
    {
        // Datos visitante
        public int VisitaId { get; set; }

        public int PersonaVisitaId { get; set; }
        public string NombreCompletoVisitante { get; set; }
        public string TipoDocVisitante { get; set; }
        public string DocumentoVisitante { get; set; }
        public string FechaIngreso { get; set; }
        public string FechaSalida { get; set; }
        public string UsuarioRegistro { get; set; }
        public string FechaRegistro { get; set; }
        public string FechaPosibleSalida { get; set; }

        // Datos Anfitrión
        public int PersonaId { get; set; }
        public string NombreCompletoAnfitrion { get; set; }
        public string TipoDocAnfitrion { get; set; }
        public string DocumentoAnfitrion { get; set; }

        // Otros
        public string Estado { get; set; }
        public string Comentario { get; set; }
    }
}
