namespace AppDepa.Infraestructura.Datos.Dapper.Mascota
{
    public class MascotaDto
    {
        public int MascotaId { get; set; }
        public string NombreMascota { get; set; }
        public string Sexo { get; set; }
        public string Especie { get; set; }
        public string Departamento { get; set; }
        public bool Eliminado { get; set; }
        public string FechaRegistro { get; set; }
        public string Usuario { get; set; }
    }
}
