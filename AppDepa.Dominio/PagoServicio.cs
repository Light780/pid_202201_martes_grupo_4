using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace AppDepa.Dominio
{
    public class PagoServicio
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int PagoServicioId { get; set; }
        public int BoletaId { get; set; }
        public Boleta Boleta { get; set; }
        [Column(TypeName = "varchar(10)")]
        public string NroOperacion { get; set; }
        public DateTime FechaPago { get; set; }
        public int UsuarioId { get; set; }
        public Usuario Usuario { get; set; }
    }
}
