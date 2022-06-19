using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace AppDepa.Dominio
{
    public class Boleta
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int BoletaId { get; set; }
        public int ServicioId { get; set; }
        public int DepartamentoId { get; set; }
        public Departamento Departamento { get; set; }
        [Column(TypeName = "varchar(6)")]
        public string Periodo { get; set; }
        [Column(TypeName = "varchar(8)")]
        public string CodigoPago { get; set; }
        [Column(TypeName = "decimal(9,2)")]
        public decimal Monto { get; set; }
        public int UsuarioId { get; set; }
        public Usuario Usuario { get; set; }
        public DateTime FechaPago { get; set; }
        public DateTime FechaRegistro { get; set; }
        public ICollection<PagoServicio> PagoServicios { get; set; }
    }
}
