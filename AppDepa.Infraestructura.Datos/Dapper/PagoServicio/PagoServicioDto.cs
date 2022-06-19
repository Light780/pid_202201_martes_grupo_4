namespace AppDepa.Infraestructura.Datos.Dapper.PagoServicio
{
    public class PagoServicioDto
    {
        public int PagoServicioId { get; set; }
        public string NroOperacion { get; set; }
        public string FechaPago { get; set; }
        public string Usuario { get; set; }
        public decimal Monto { get; set; }
        public string Persona { get; set; } //Nombre de la persona que cancelo, viene de tabla Persona
        public string FechaRegistro { get; set; }
    }
}
