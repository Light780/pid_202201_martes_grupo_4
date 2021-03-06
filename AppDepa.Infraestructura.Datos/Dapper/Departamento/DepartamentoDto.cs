namespace AppDepa.Infraestructura.Datos.Dapper.Departamento
{
    public class DepartamentoDto
    {
        public int DepartamentoId { get; set; }

        public string NroDepartamento { get; set; }

        public decimal Tamano { get; set; }

        // Primer parametro
        public string TipoDepa { get; set; }
        // Segundo parametro
        public string Estado { get; set; }

        public int CantidadHabitaciones { get; set; }

        public bool IndCocina { get; set; }

        public bool IndBalcon { get; set; }

        public bool IndLavanderia { get; set; }

        public bool IndPiscina { get; set; }

        public bool IndPatio { get; set; }
        public bool Eliminado { get; set; }
        public string FechaRegistro { get; set; }
        public string Usuario { get; set; }
    }
}
