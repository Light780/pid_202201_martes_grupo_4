namespace AppDepa.Infraestructura.Datos.Dapper.PagoServicio
{
    public class PagoServicioDto
    {
        public int PagoServicioId { get; set; }
        public string CodigoPago { get; set; } //Viene de tabla Boleta
        public string NroOperacion { get; set; }
        public string FechaPago { get; set; }
        public string Usuario { get; set; }
        public decimal Monto { get; set; }
        public string Persona { get; set; } //Nombre de la persona que cancelo, viene de tabla Persona
    }
}
