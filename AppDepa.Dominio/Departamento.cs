using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppDepa.Dominio
{
    public class Departamento
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int DepartamentoId { get; set; }
        [Column(TypeName = "varchar(45)")]
        public string CodigoDepartamentoId { get; set; }
        [Column(TypeName = "varchar(1000)")]
        public string Descripcion { get; set; }
        [Column(TypeName = "varchar(200)")]
        public string Tamano { get; set; }
        [Column(TypeName = "varchar(500)")]
        public string Direccion { get; set; }
        [Column(TypeName = "varchar(40)")]
        public string UbigeoId { get; set; }
        [Column(TypeName = "varchar(40)")]
        public string TipoDepaId { get; set; }
        public DateTime FechaRegistro { get; set; }
    }
}
