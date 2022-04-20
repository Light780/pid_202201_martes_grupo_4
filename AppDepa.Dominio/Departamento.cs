using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace AppDepa.Dominio
{
    public class Departamento
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int DepartamentoId { get; set; }
        [Column(TypeName = "varchar(3)")]
        public string NroDepartamento { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal Tamano { get; set; }
        public int TipoDepaId { get; set; }
        public int EstadoId { get; set; }

        public int CantidadHabitaciones { get; set; }
        [Column(TypeName = "bit")]
        public bool IndCocina { get; set; }
        [Column(TypeName = "bit")]
        public bool IndBalcon { get; set; }
        [Column(TypeName = "bit")]
        public bool IndLavanderia { get; set; }
        [Column(TypeName = "bit")]
        public bool IndPiscina { get; set; }
        [Column(TypeName = "bit")]
        public bool IndPatio { get; set; }
        public DateTime FechaRegistro { get; set; }
        public int UsuarioId { get; set; }
        public Usuario Usuario { get; set; }


        // Relación con Mascota
        public ICollection<Mascota> Mascotas { get; set; }
        public ICollection<Persona> Personas { get; set; }
        public ICollection<Boleta> Boletas { get; set; }
        public ICollection<Incidencia> Incidencias { get; set; }
    }
}
