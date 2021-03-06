using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AppDepa.Dominio
{
    public class HistorialIncidencia
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int HistorialIncidenciaId { get; set; }
        public int IncidenciaId { get; set; }
        public Incidencia Incidencia { get; set; }
        public int DepartamentoId { get; set; }
        public Departamento Departamento { get; set; }
        public int TipoIncidenciaId { get; set; }
        [Column(TypeName = "varchar(300)")]
        public string DescripcionIncidencia { get; set; }
        public int EstadoIncidenciaId { get; set; }
        [DataType(DataType.DateTime)]
        public DateTime FechaIncidencia { get; set; }
        [DataType(DataType.DateTime)]
        public DateTime FechaRegistro { get; set; }
        public int UsuarioId { get; set; }
        public Usuario Usuario { get; set; }
        public int PersonaId { get; set; }
        public Persona Persona { get; set; }
    }
}
