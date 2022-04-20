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
        [Column(TypeName = "decimal(18,2)")]
        public decimal Monto { get; set; }
        public int UsuarioId { get; set; }
        public Usuario Usuario { get; set; }

    }
}
